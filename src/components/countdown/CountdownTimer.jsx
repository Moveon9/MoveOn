import React from 'react';
import { View,Text, StyleSheet} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function CountdownTimer({ isPlaying, onComplete }) {
  return (
    <View style={styles.wrapper}>
        <View style={styles.centerContent}>
            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={3}
                colors={["#398342","#398342", "#398342", "#398342"]}
                colorsTime={[3,2,1,0]}
                strokeWidth={25}
                updateInterval={0.01}
                onComplete={onComplete}
                >
                {({ remainingTime, color }) => (
                    <Text style={{ color, fontSize: 40 }}>
                    {remainingTime}
                    </Text>
                )}
            </CountdownCircleTimer>
        </View>
        <View style={styles.tipContainer}>
            <Text>
                <Text style={styles.tipLabel}>Tip. </Text>
                <Text style={styles.tipText}>자동차는 측정이 되지 않습니다.</Text>
            </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'space-between', // 위-아래로 분산
        alignItems: 'center',
        paddingVertical: 40,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    timerText: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    tipContainer: {
        position: 'absolute',
        bottom: 40, // 하단에서 40px 위
        alignSelf: 'center',
    },
    tipLabel: {
      fontWeight: 'bold',
      color: '#4CAF50', // 초록색
      fontSize: 14,
    },
    tipText: {
      fontSize: 14,
      color: '#000',
    },
  });


  