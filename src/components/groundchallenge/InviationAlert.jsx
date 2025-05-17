import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function InvitationAlert({ nickname = '홍길동' }) {
  return (
    <View style={styles.alertContainer}>
      <Image
        source={require('../../assets/icons/bell.png')} // 알림 아이콘 경로에 맞게 수정하세요
        style={styles.bellIcon}
      />
      <Text style={styles.message}>
        <Text style={styles.bold}>{nickname}</Text>
        님이 땅따먹기 초대장을 보냈습니다!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bellIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  message: {
    fontSize: 14,
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
});
