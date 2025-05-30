import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

export default function StartWaitingScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* 닫기 버튼 */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Image
          source={require('../../assets/image/groundchallenge/ic_close.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>

      {/* 중앙 콘텐츠 */}
      <View style={styles.center}>
        <Text style={styles.title}>게임 시작을 기다리는 중..</Text>
        <ActivityIndicator
          size="large"
          color="#599F47"
          style={styles.spinner}
        />
      </View>

      {/* 하단 Tip */}
      <View style={styles.footer}>
        <Text style={styles.tip}>
          <Text style={styles.tipLabel}>Tip.</Text> 상대방의 땅을 점령할 수 있습니다.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // 화면 배경
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 24,
    height: 24,
    zIndex: 10,
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#599F47',
    marginBottom: 24,
  },
  spinner: {
    // 제목과 스피너 간 간격
  },
  footer: {
    paddingBottom: 32,
    alignItems: 'center',
  },
  tip: {
    fontSize: 14,
    color: '#599F47',
  },
  tipLabel: {
    fontWeight: '700',
  },
});
