import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Polyline, Marker } from 'react-native-maps';
import haversine from 'haversine-distance';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

function interpolatePoints(p1, p2, steps) {
  const result = [];
  for (let i = 1; i <= steps; i++) {
    const lat = p1.latitude + (p2.latitude - p1.latitude) * (i / steps);
    const lng = p1.longitude + (p2.longitude - p1.longitude) * (i / steps);
    result.push({ latitude: lat, longitude: lng });
  }
  return result;
}

function densifyCourse(coords, stepsPerSegment = 10) {
  const dense = [];
  for (let i = 0; i < coords.length - 1; i++) {
    dense.push(coords[i]);
    dense.push(...interpolatePoints(coords[i], coords[i + 1], stepsPerSegment));
  }
  dense.push(coords[coords.length - 1]);
  return dense;
}

export default function MarathonCoursePage({ route }) {
  const navigation = useNavigation();
  const { courseCoordinates } = route.params;
  const denseCourse = densifyCourse(courseCoordinates, 10);

  const start = denseCourse[0];
  const end = denseCourse[denseCourse.length - 1];

  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const [passedCoords, setPassedCoords] = useState([]);
  const [remainingCoords, setRemainingCoords] = useState(denseCourse);
  const [showStartModal, setShowStartModal] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [showOffCourseModal, setShowOffCourseModal] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

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

  const toXY = (coord) => {
    const R = 6371000;
    const latRad = (coord.latitude * Math.PI) / 180;
    const lonRad = (coord.longitude * Math.PI) / 180;
    return {
      x: R * Math.cos(latRad) * lonRad,
      y: R * latRad,
    };
  };

  const distanceToSegment = (P, A, B) => {
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    if (dx === 0 && dy === 0) return Math.hypot(P.x - A.x, P.y - A.y);

    const t = Math.max(0, Math.min(1, ((P.x - A.x) * dx + (P.y - A.y) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(P.x - (A.x + t * dx), P.y - (A.y + t * dy));
  };

  const isOffCoursePrecise = (loc, path, threshold = 20) => {
    const P = toXY(loc);
    return !path.some((_, i) => {
      if (i === path.length - 1) return false;
      const A = toXY(path[i]);
      const B = toXY(path[i + 1]);
      return distanceToSegment(P, A, B) < threshold;
    });
  };

  const isNearStart = (loc, start, threshold = 10) => {
    const distance = haversine(loc, start);
    console.log('📏 거리: ', distance);
    return distance <= threshold;
  };

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

  useEffect(() => {
    if (!isTracking) return;

    const watchId = Geolocation.watchPosition(
      (position) => {
        const current = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(current);
        console.log('📍 현재 위치:', current);

        if (isOffCoursePrecise(current, denseCourse) && !offCourseCooldownRef.current) {
          setShowOffCourseModal(true);
          offCourseCooldownRef.current = true;
          setTimeout(() => {
            offCourseCooldownRef.current = false;
          }, 3000);
        }

        const nextIdx = remainingCoordsRef.current.findIndex(
          (coord) => haversine(current, coord) < 10
        );

        if (nextIdx !== -1) {
          const updatedPassed = remainingCoordsRef.current.slice(0, nextIdx + 1);
          const updatedRemaining = remainingCoordsRef.current.slice(nextIdx + 1);
          setPassedCoords((prev) => [...prev, ...updatedPassed]);
          setRemainingCoords(updatedRemaining);
          remainingCoordsRef.current = updatedRemaining;
        }
      },
      (error) => console.error('위치 추적 오류:', error),
      { enableHighAccuracy: true, distanceFilter: 5, interval: 1000 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, [isTracking]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: start.latitude,
            longitude: start.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Polyline coordinates={denseCourse} strokeColor="gray" strokeWidth={4} />
          <Polyline coordinates={remainingCoords} strokeColor="red" strokeWidth={6} />

          <Marker coordinate={start} title="출발">
            <Image source={require('../../assets/image/marathon/ic_start.png')} style={styles.markerImage} />
          </Marker>
          <Marker coordinate={end} title="도착">
            <Image source={require('../../assets/image/marathon/ic_destination.png')} style={styles.markerImage} />
          </Marker>
        </MapView>

        {!isTracking && !countdownStarted && (
          <TouchableOpacity style={styles.challengeButton} onPress={handleStartPress}>
            <Text style={styles.challengeButtonText}>출발하기</Text>
          </TouchableOpacity>
        )}

        <Modal visible={showStartModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={require('../../assets/image/common/LogRabbit.png')} style={styles.image} />
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>출발지점으로 이동해주세요!</Text>
              <TouchableOpacity onPress={() => setShowStartModal(false)} style={styles.modalButton}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={showOffCourseModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={require('../../assets/image/common/LogRabbit.png')} style={styles.image} />
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>경로를 이탈했습니다!</Text>
              <TouchableOpacity onPress={() => setShowOffCourseModal(false)} style={styles.modalButton}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#fff' },
  image: { width: 100, height: 100, alignSelf: 'center', marginBottom: 20 },
  challengeButton: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
    backgroundColor: '#398342',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    height: 65,
  },
  challengeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  modalButton: {
    marginTop: 25,
    backgroundColor: '#398342',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  markerImage: {
    width: 25,
    height: 25,
    resizeMode: "contain"
  },
});
