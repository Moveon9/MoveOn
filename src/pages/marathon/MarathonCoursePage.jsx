import React, { useState, useEffect, useRef, useCallback, useMemo} from 'react';
import { View, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useTimer from '../../hooks/marathon/useTimer';
import { isOffCoursePrecise, isNearStart } from '../../utils/marathon/distanceUtils';
import TimerHeader from '../../components/marathon/utils/TimerHeader';
import StartModal from '../../components/marathon/utils/StartModal';
import OffCourseModal from '../../components/marathon/utils/OffCourseModal';
import StartButton from '../../components/marathon/button/StartButton';
import MarathonMap from '../../components/marathon/map/MarathonMap';
import haversine from 'haversine-distance';
import FinishModal from '../../components/marathon/utils/FinishModal';


export default function MarathonCoursePage({ route }) {
  const navigation = useNavigation();
  const { courseCoordinates } = route.params;

  const denseCourse = useMemo(() => densifyCourse(courseCoordinates, 50), [courseCoordinates]);
  const start = denseCourse[0];
  const end = denseCourse[denseCourse.length - 1];

  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const [passedCoords, setPassedCoords] = useState([]);
  const [remainingCoords, setRemainingCoords] = useState(denseCourse);
  const [showStartModal, setShowStartModal] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [showOffCourseModal, setShowOffCourseModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  const {elapsedTime, formatTime} = useTimer(isTracking);
  const remainingCoordsRef = useRef(denseCourse);
  const offCourseCooldownRef = useRef(false);
  
  useEffect(() => {
    remainingCoordsRef.current = remainingCoords;
  }, [remainingCoords]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.tracking) {
        setIsTracking(true);
      }
    }, [route.params?.tracking])
  );

  const handleStartPress = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(currentLocation);

        if (isNearStart(currentLocation, start)) {
          setCountdownStarted(true);
          navigation.navigate('Countdown_marathon', {
            courseCoordinates: denseCourse,
            tracking: true,
          });
        } else {
          setShowStartModal(true);
        }
      },
      (error) => {
        console.error('위치 가져오기 실패:', error);
        setShowStartModal(true);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  };

  const handlePositionUpdate = useCallback((position) => {
    const current = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    setUserLocation(current);

    if (isOffCoursePrecise(current, denseCourse) && !offCourseCooldownRef.current) {
      setShowOffCourseModal(true);
      offCourseCooldownRef.current = true;
      setTimeout(() => {
        offCourseCooldownRef.current = false;
      }, 3000);
    }
    if (haversine(current , end) < 2 && !showFinishModal){
      setShowFinishModal(true);
    }

    const nextIdx = remainingCoordsRef.current.findIndex(
      (coord) => haversine(current, coord) < 5
    );

    if (nextIdx !== -1) {
      const updatedPassed = remainingCoordsRef.current.slice(0, nextIdx + 1);
      const updatedRemaining = remainingCoordsRef.current.slice(nextIdx + 1);
      setPassedCoords((prev) => [...prev, ...updatedPassed]);
      setRemainingCoords(updatedRemaining);
      remainingCoordsRef.current = updatedRemaining;
    }

  }, [denseCourse, end, formatTime, navigation]);

  useEffect(() => {
    if (!isTracking) return;

    const watchId = Geolocation.watchPosition(
      handlePositionUpdate,
      (error) => console.error('위치 추적 오류:', error),
      { enableHighAccuracy: true, distanceFilter: 0.8, interval:100 }
    );
    return () => Geolocation.clearWatch(watchId);
  },[isTracking, handlePositionUpdate]);

  return (
    <View style={styles.container}>
      {isTracking && <TimerHeader elapsedTime={formatTime()} />}

      <MarathonMap
        start={start}
        end={end}
        denseCourse={denseCourse}
        remainingCoords={remainingCoords}
        passedCoords={passedCoords}
      />
      {!isTracking && !countdownStarted && (
        <StartButton onPress={handleStartPress} />
      )}

      <StartModal visible={showStartModal} onClose={() => setShowStartModal(false)}/>
      <OffCourseModal visible={showOffCourseModal} onClose={() => setShowOffCourseModal(false)} />
      <FinishModal visible={showFinishModal} elapsedTime={formatTime()} onClose={() => setShowFinishModal(false)}/>
    </View>
  );
}

const densifyCourse = (coords, stepsPerSegment = 10) => {
  const dense = [];
  for (let i = 0; i < coords.length - 1; i++) {
    dense.push(coords[i]);
    dense.push(...interpolatePoints(coords[i], coords[i + 1], stepsPerSegment));
  }
  dense.push(coords[coords.length - 1]);
  return dense;
};
const interpolatePoints = (p1, p2, steps) => {
  const result = [];
  for (let i = 1; i <= steps; i++) {
    const lat = p1.latitude + (p2.latitude - p1.latitude) * (i / steps);
    const lng = p1.longitude + (p2.longitude - p1.longitude) * (i / steps);
    result.push({ latitude: lat, longitude: lng });
  }
  return result;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});