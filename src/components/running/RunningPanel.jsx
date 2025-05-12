import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RunningPanel({ region }) {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [steps, setSteps] = useState(0);
  const [gridCount, setGridCount] = useState(0);
  
  const panelHeight = useRef(new Animated.Value(100)).current;
  const timerRef = useRef(null);

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
      const newHeight = Math.max(100, Math.min(500 - gestureState.dy, 500));
      panelHeight.setValue(newHeight);
    },
    onPanResponderRelease: (_, gestureState) => {
      const shouldExpand = gestureState.dy < 0 || gestureState.vy < -0.5;
      setIsExpanded(shouldExpand);
      Animated.spring(panelHeight, {
        toValue: shouldExpand ? 500 : 100,
        useNativeDriver: false,
      }).start();
    },
  });

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.spring(panelHeight, {
      toValue: !isExpanded ? 500 : 100,
      useNativeDriver: false,
    }).start();
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const stopTimer = () => {
    pauseTimer();
    // 운동 기록 저장 페이지로 이동
    navigation.navigate('RunningRecordSave', {
      duration: formatTime(time),
      distance: `${distance}m`,
      steps: steps.toLocaleString(),
      gridCount,
      heartRate: '-',
      calories: '3,050',
      region,
    });
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
        <View style={styles.timeSection}>
          <Text style={styles.timeLabel}>달린 시간 :</Text>
          <Text style={styles.timeValue}>{formatTime(time)}</Text>
        </View>

        <View style={styles.buttonContainer}>
          {!isRunning ? (
            <TouchableOpacity style={styles.startButton} onPress={startTimer}>
              <Text style={styles.buttonText}>▶</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.controlButtons}>
              <TouchableOpacity style={[styles.controlButton, { marginRight: 10 }]} onPress={pauseTimer}>
                <Text style={styles.buttonText}>⏸</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={stopTimer}>
                <Text style={styles.buttonText}>⏹</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {isExpanded && (
          <View style={styles.statsContainer}>
            <View style={styles.statsColumn}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>거리</Text>
                <Text style={styles.statValue}>{distance}m</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>현재 칸의 수</Text>
                <Text style={styles.statValue}>{gridCount}</Text>
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
                <Text style={styles.statValue}>{steps}</Text>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    flex: 1,
    padding: 16,
  },
  timeSection: {
    marginBottom: 20,
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
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  startButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#398342',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#398342',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 16,
  },
  statsColumn: {
    flex: 1,
  },
  statItem: {
    marginBottom: 20,
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
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
});