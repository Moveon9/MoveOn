import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
} from 'react-native';

export default function InvitationAlert({ nickname = '홍길동', onDismiss }) {
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          translateY.setValue(gestureState.dy); // 위로 스와이프만 적용
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          Animated.timing(translateY, {
            toValue: -200,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onDismiss?.(); // 부모에서 닫기 처리
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.alertContainer,
        { transform: [{ translateY }] },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.contentWrapper}>
        <Image
          source={require('../../assets/image/groundchallenge/ic_alert.png')}
          style={styles.bellIcon}
        />
        <Text style={styles.message}>
          <Text style={styles.bold}>{nickname}</Text>
          님이 <Text style={styles.normal}>땅따먹기</Text> 초대장을 보냈습니다!
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 999,
    backgroundColor: '#FAFAFA',
    paddingVertical: 23,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
    flexShrink: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  normal: {
    fontWeight: 'normal',
  },
});
