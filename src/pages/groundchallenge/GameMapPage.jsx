import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import useVisitedGrid from '../hooks/groundchallenge/useVisitedGrid';
import useGameTimer from '../hooks/groundchallenge/useGameTimer';

export default function GameMapPage({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const polygonMap = useVisitedGrid(30, false); // 30m 격자
  const { timeString } = useGameTimer();
  
  const [playerScore, setPlayerScore] = useState(21);
  const [opponentScore, setOpponentScore] = useState(13);

  // 점수 계산 (방문한 격자 수)
  useEffect(() => {
    const visitedCount = Object.keys(polygonMap).length;
    setPlayerScore(visitedCount);
  }, [polygonMap]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={true}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={false}
        rotateEnabled={false}
        mapType="standard"
      >
        {/* 플레이어 방문 영역 (파란색) */}
        {Object.entries(polygonMap).map(([key, polygon]) => (
          <Polygon
            key={key}
            coordinates={polygon}
            fillColor="rgba(74, 144, 226, 0.7)"
            strokeColor="rgba(74, 144, 226, 0.9)"
            strokeWidth={1}
          />
        ))}
        
        {/* 상대방 영역 (빨간색) - 예시 데이터 */}
        <Polygon
          coordinates={[
            { latitude: 37.5670, longitude: 126.9785 },
            { latitude: 37.5670, longitude: 126.9790 },
            { latitude: 37.5675, longitude: 126.9790 },
            { latitude: 37.5675, longitude: 126.9785 },
          ]}
          fillColor="rgba(231, 76, 60, 0.7)"
          strokeColor="rgba(231, 76, 60, 0.9)"
          strokeWidth={1}
        />
      </MapView>

      {/* 상단 UI */}
      <View style={styles.topContainer}>
        <Text style={styles.timerText}>{timeString}</Text>
        
        <View style={styles.scoreContainer}>
          <View style={[styles.scoreBox, styles.playerScoreBox]}>
            <View style={styles.playerIcon} />
            <Text style={styles.scoreText}>Me</Text>
            <Text style={styles.scoreNumber}>{playerScore}</Text>
          </View>
          
          <Text style={styles.vsText}>vs</Text>
          
          <View style={[styles.scoreBox, styles.opponentScoreBox]}>
            <View style={styles.opponentIcon} />
            <Text style={styles.scoreText}>윤지석</Text>
            <Text style={styles.scoreNumber}>{opponentScore}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  timerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 15,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  playerScoreBox: {
    backgroundColor: '#4A90E2',
  },
  opponentScoreBox: {
    backgroundColor: '#E74C3C',
  },
  playerIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  opponentIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  scoreNumber: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  vsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
});
