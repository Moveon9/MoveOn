// pages/LoginPage.jsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import KakaoLoginButton from '../../components/auth/KakaoLoginButton'; // 아래 컴포넌트 참조

export default function LoginPage({ navigation }) {
  //const handleLoginSuccess = (profile) => {
  //  navigation.replace('MainTabs', { user: profile });
  //};
  const handleKakaoLogin = () => {
    // ⚠️ 실제 로그인 구현 전까지는 아래 코드로 우선 이동 처리
    navigation.navigate('UserInfo1');
  };

  return (
    <View style={styles.container}>
      {/* 로고 이미지 */}
      <Image
        source={require('../../assets/image/auth/logo.png')} // 로고 이미지 경로 확인
        style={styles.logo}
      />

      <Text style={styles.subtitle}>
        땅따먹기와 함께하는{'\n'}
        <Text style={{ fontWeight: 'bold' }}>즐거운 움직임</Text>
      </Text>

      <KakaoLoginButton onLoginSuccess={handleKakaoLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    color: '#234123',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#000',
  },
});
