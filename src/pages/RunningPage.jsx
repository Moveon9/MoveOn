import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapViewComponent from '../components/map/MapViewComponent';
import RunningPanel from '../components/running/RunningPanel';

export default function RunningPage({ route }) {
  const { region, currentSpeed } = route.params;

  return (
    <View style={styles.container}>
      <MapViewComponent region={region} onRegionChange={() => {}} />
  
      {/* 상단 정보 */}
      <SafeAreaView style={styles.headerContainer} edges={['top']}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>오늘 기록</Text>
            <Text style={styles.speedText}>{currentSpeed} km/h</Text>
          </View>
        </View>
      </SafeAreaView>
  
      {/* 바로 RunningPanel 배치 */}
      <RunningPanel />
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
  },
});