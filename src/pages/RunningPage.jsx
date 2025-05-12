import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapViewComponent from '../components/map/MapViewComponent';
import RunningPanel from '../components/running/RunningPanel';
import TabBar from '../components/running/TabBar';

export default function RunningPage() {
  const [region, setRegion] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [currentSpeed, setCurrentSpeed] = useState(0);

  useEffect(() => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        if (position.coords.speed) {
          setCurrentSpeed((position.coords.speed * 3.6).toFixed(1));
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapViewComponent 
        region={region} 
        onRegionChange={setRegion}
      />
      <SafeAreaView style={styles.headerContainer} edges={['top']}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>오늘 기록</Text>
            <Text style={styles.speedText}>{currentSpeed} km/h</Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.contentContainer}>
        <RunningPanel region={region} />
      </View>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  speedText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4CAF50',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 60, // TabBar 높이만큼 여백
  },
});