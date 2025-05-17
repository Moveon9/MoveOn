// components/auth/KakaoLoginButton.jsx
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { login, getProfile } from '@react-native-seoul/kakao-login';

export default function KakaoLoginButton({ onLoginSuccess }) {
  const handleLogin = async () => {
    //try {
    //  const token = await login();
    //  const profile = await getProfile();
    //   console.log('✅ 로그인 성공:', profile);
    //   onLoginSuccess(profile);
    // } catch (err) {
    //   console.warn('❌ 로그인 실패:', err);
    // }
    onLoginSuccess && onLoginSuccess(null);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Image
        source={require('../../assets/image/auth/kakao_login_large_wide.png')} // 카카오 버튼 이미지
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
  },
  image: {
    width: 300,
    height: 45,
    resizeMode: 'contain',
  },
});
