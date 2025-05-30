// pages/running/RunningPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  Text,
} from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

import useVisitedGrid from '../../components/running/utils/UseVisitedGrid';
import RunningPanel from '../../components/running/RunningPanel';
import SpeedWarningModal from './SpeedWarningModal';

const SPEED_THRESHOLD = 15;        // km/h 경고 기준 속도
const MIN_SPEED_THRESHOLD = 0.5;   // km/h 최소 유의 속도

export default function RunningPage({ route }) {
  const { region } = route.params;
  const navigation = useNavigation();

  // 러닝 상태
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const timerRef = useRef(null);

  // 속도 경고 모달 상태
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [pausedBeforeModal, setPausedBeforeModal] = useState(false);

  // 속도 평활화 히스토리
  const speedHistoryRef = useRef([]);
  const MAX_SPEED_SAMPLES = 3;
  const smoothSpeed = (newSpeed) => {
    speedHistoryRef.current.push(newSpeed);
    if (speedHistoryRef.current.length > MAX_SPEED_SAMPLES) {
      speedHistoryRef.current.shift();
    }
    const sum = speedHistoryRef.current.reduce((a, b) => a + b, 0);
    const avg = sum / speedHistoryRef.current.length;
    return avg < MIN_SPEED_THRESHOLD ? 0 : avg;
  };

  // 그리드 맵 (isPaused가 true면 새로운 칸 채우기 중단)
  const polygonMap = useVisitedGrid(10, isPaused);

  // 위치 업데이트 구독
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      ({ coords }) => {
        const s = coords.speed; // m/s
        const speedKmh = (s != null && s >= 0) ? s * 3.6 : 0;
        setCurrentSpeed(smoothSpeed(speedKmh));
      },
      (error) => console.warn('위치 추적 오류:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 1000,
        fastestInterval: 500,
        maximumAge: 500,
      }
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  // 타이머 카운트
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  // 속도 기준 트리거 (threshold 이상일 때마다)
  useEffect(() => {
    if (currentSpeed >= SPEED_THRESHOLD && !showSpeedModal) {
      // 모달 표시 전 상태 저장 후 즉시 일시정지
      setPausedBeforeModal(isPaused);
      setIsPaused(true);
      setShowSpeedModal(true);
      console.log(`치팅 감지: ${currentSpeed.toFixed(1)} km/h - 러닝 자동 일시정지`);
    }
  }, [currentSpeed, showSpeedModal, isPaused]);

  // 모달에서 '계속' 선택 시
  const handleContinueFromModal = () => {
    setShowSpeedModal(false);
    // 모달 이전에 일시정지 상태가 아니었으면 재개
    if (!pausedBeforeModal) {
      setIsPaused(false);
    }
  };

  // 캡처 & RecordPage 이동
  const viewShotRef = useRef();
  const handleStopAndNavigate = async () => {
    setShowSpeedModal(false);
    setIsPaused(true);
    clearInterval(timerRef.current);
    try {
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 0.8,
      });
      navigation.navigate('RecordPage', {
        filledGridCount: Object.keys(polygonMap).length,
        elapsedTime,
        totalDistance: 1,   // TODO: 실제 계산 로직 추가
        stepCount: 10000,   // TODO
        heartRateAvg: 160,  // TODO
        caloriesBurned: 231,// TODO
        mapCapture: uri,
      });
    } catch (err) {
      console.error('캡처 실패:', err);
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot
        ref={viewShotRef}
        options={{ format: 'png', quality: 0.9 }}
        style={StyleSheet.absoluteFill}
      >
        <MapView
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE}
          googleMapId='99c07a8894d0db7366aa3689'
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          showsUserLocation
          followsUserLocation
        >
          {Object.entries(polygonMap).map(([key, coords]) => (
            <Polygon
              key={key}
              coordinates={coords}
              fillColor="rgba(52,168,83,0.3)"
              strokeColor="rgba(52,168,83,0.8)"
              strokeWidth={1}
            />
          ))}
        </MapView>
      </ViewShot>

      {/* 헤더 */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>오늘 기록</Text>
          <Text style={[
            styles.speedText,
            currentSpeed >= SPEED_THRESHOLD && { color: '#FF5722' }
          ]}>
            {currentSpeed === 0
              ? '0.0 km/h'
              : `${currentSpeed.toFixed(1)} km/h`}
          </Text>
        </View>
      </SafeAreaView>

      {/* 러닝 패널 */}
      <RunningPanel
        elapsedTime={elapsedTime}
        isPaused={isPaused}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        onStop={handleStopAndNavigate}
        filledGridCount={Object.keys(polygonMap).length}
      />

      {/* 속도 경고 모달 */}
      <SpeedWarningModal
        visible={showSpeedModal}
        threshold={SPEED_THRESHOLD}
        onStop={handleStopAndNavigate}
        onContinue={handleContinueFromModal}
        onRequestClose={() => setShowSpeedModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 10,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  headerContent: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  speedText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
});
