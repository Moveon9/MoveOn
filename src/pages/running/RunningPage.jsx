// pages/RunningPage.jsx
import React, { useState, useEffect, useRef }from 'react';
import { View, StyleSheet, SafeAreaView, Platform, Text } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import useVisitedGrid from '../../components/running/utils/UseVisitedGrid';
import RunningPanel from '../../components/running/RunningPanel';
import { useNavigation } from '@react-navigation/native';
import ViewShot, { captureRef } from "react-native-view-shot";


export default function RunningPage({ route }) {
  const { region, currentSpeed } = route.params;
  const navigation = useNavigation();
  // pannel controll
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const polygonMap = useVisitedGrid(10, isPaused); // 10m 격자

  // map capture
  const viewShotRef = useRef();

  useEffect(() => {
    if (!isPaused){
      timerRef.current = setInterval(() =>{
        setElapsedTime(prev => prev + 1);
      }, 1000)
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current)
  }, [isPaused]);

  const handleStopAndNavigate = async () => {
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
        totalDistance: 1, // TODO: 실제 거리 계산 로직
        stepCount: 10000,  // 임시
        heartRateAvg: 160, // 임시
        caloriesBurned: 231, // 임시
        mapCapture: uri,
      });
    } catch (error) {
      console.error("캡처 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }} style={StyleSheet.absoluteFill}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.002,     // 더 작게 설정 = 더 Zoom-in
            longitudeDelta: 0.002,    // 더 작게 설정 = 더 Zoom-in
          }}
          showsUserLocation
        >
          {Object.entries(polygonMap).map(([key, coords]) => (
            <Polygon
              key={key}
              coordinates={coords}
              fillColor="rgba(52, 168, 83, 0.3)"
              strokeColor="rgba(52, 168, 83, 0.8)"
              strokeWidth={1}
            />
          ))}
        </MapView>
      </ViewShot>

      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>오늘 기록</Text>
          <Text style={styles.speedText}>{typeof currentSpeed === 'number' ? `${currentSpeed.toFixed(1)} km/h` : '0 km/h'}</Text>
        </View>
      </SafeAreaView>

      <RunningPanel 
        elapsedTime={elapsedTime}
        isPaused={isPaused}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        onStop={handleStopAndNavigate}
        filledGridCount={Object.keys(polygonMap).length}
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
    alignContent: 'center'
  },
  headerContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  speedText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#4CAF50',
  },
});
