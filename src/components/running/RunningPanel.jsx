import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  Image,
  Dimensions,
} from 'react-native';
import UseDistance from '../../components/running/utils/UseDistance';
import playIcon from '../../assets/image/main/ic_play.png';
import pauseIcon from '../../assets/image/main/ic_pause.png';
import stopIcon from '../../assets/image/main/ic_stop.png';

const MAX_HEIGHT = 320; // 패널 최대 높이
const MIN_HEIGHT = 160; // 패널 최소 높이

export default function RunningPanel({
  elapsedTime,
  isPaused,
  onPause,
  onResume,
  onStop,
  filledGridCount,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;
  const timerRef = useRef(null);

  // 거리 추적 훅 사용
  const { distance, formattedDistance, resetDistance } = UseDistance(isPaused);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newHeight = Math.max(
        MIN_HEIGHT,
        Math.min(MAX_HEIGHT - gestureState.dy, MAX_HEIGHT),
      );
      panelHeight.setValue(newHeight);
    },
    onPanResponderRelease: (_, gestureState) => {
      const shouldExpand = gestureState.dy < 0 || gestureState.vy < -0.5;
      setIsExpanded(shouldExpand);
      Animated.spring(panelHeight, {
        toValue: shouldExpand ? MAX_HEIGHT : MIN_HEIGHT,
        useNativeDriver: false,
      }).start();
    },
  });

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
    Animated.spring(panelHeight, {
      toValue: !isExpanded ? MAX_HEIGHT : MIN_HEIGHT,
      useNativeDriver: false,
    }).start();
  };

  // 러닝 중지 시 거리 초기화
  const handleStop = () => {
    resetDistance();
    onStop();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <Animated.View style={[styles.panel, { height: panelHeight }]}>      
      <TouchableOpacity style={styles.handleContainer} onPress={handleToggleExpand}>
        <View style={styles.handle} />
      </TouchableOpacity>

      <View style={styles.content} {...panResponder.panHandlers}>
        <View style={styles.timeRow}>
          <View style={styles.timeTextBox}>
            <Text style={styles.timeLabel}>달린 시간 :</Text>
            <Text style={styles.timeValue}>{formatTime(elapsedTime)}</Text>
          </View>

          {!isPaused ? (
            <View style={styles.controlGroup}>
              <TouchableOpacity onPress={onPause} style={styles.iconButton}>
                <Image source={pauseIcon} style={styles.iconImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleStop} style={styles.iconButton}>
                <Image source={stopIcon} style={styles.iconImage} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.controlGroup}>
              <TouchableOpacity onPress={onResume} style={styles.iconButton}>
                <Image source={playIcon} style={styles.iconImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleStop} style={styles.iconButton}>
                <Image source={stopIcon} style={styles.iconImage} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {isExpanded && (
          <View style={styles.statsContainer}>
            <View style={styles.statsColumn}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>거리</Text>
                <Text style={styles.statValue}>{formattedDistance}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>현재 칸의 수</Text>
                <Text style={styles.statValue}>{filledGridCount}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statsColumn}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>심박수</Text>
                <Text style={styles.statValue}>-</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>걸음 수</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  handle: {
    width: 60,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  content: {
    padding: 16,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  timeTextBox: {
    flexDirection: 'column',
  },
  timeLabel: {
    fontSize: 18,
    color: '#000',
  },
  timeValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  iconButton: {
    marginLeft: 12,
  },
  iconImage: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  controlGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  statsColumn: {
    flex: 1,
  },
  statItem: {
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 18,
    color: '#000',
  },
  statValue: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    width: 1,
    backgroundColor: '#D4D6DD',
    marginHorizontal: 16,
  },
});
