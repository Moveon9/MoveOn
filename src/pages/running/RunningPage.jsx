// pages/RunningPage.jsx
import React, { useState, useEffect, useRef }from 'react';
import { View, StyleSheet, SafeAreaView, Platform, Text } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import useVisitedGrid from '../../components/running/utils/UseVisitedGrid';
import RunningPanel from '../../components/running/RunningPanel';



export default function RunningPage({ route }) {
  const { region, currentSpeed } = route.params;
  // pannel controll
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const polygonMap = useVisitedGrid(10, isPaused); // 10m 격자

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

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        showsUserLocation
        region={region}
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

      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>오늘 기록</Text>
          <Text style={styles.speedText}>{currentSpeed} km/h</Text>
        </View>
      </SafeAreaView>

      <RunningPanel 
        elapsedTime={elapsedTime}
        isPaused={isPaused}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        onStop={() => {
          setIsPaused(true);
          setElapsedTime(0);
        }}
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
