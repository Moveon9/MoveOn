import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function Join({ navigation }) {
  const goToLogin = () => {
    navigation.navigate('LoginPage'); // 로그인 페이지로 이동
  };

  const goToJoin = () => {
    navigation.navigate('UserInfo1'); // 회원가입 첫 페이지로 이동
  };

  return (
    <View style={styles.container}>
      {/* 로고 이미지 */}
      <Image
        source={require('../../assets/image/auth/logo.png')}
        style={styles.logo}
      />

      {/* 슬로건 */}
      <Text style={styles.subtitle}>
        땅따먹기와 함께하는{'\n'}
        <Text style={styles.boldText}>즐거운 움직임</Text>
      </Text>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 회원가입 링크 */}
      <TouchableOpacity onPress={goToJoin}>
        <Text style={styles.joinText}>회원가입</Text>
      </TouchableOpacity>
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
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#398342',
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 14,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  joinText: {
    fontSize: 14,
    color: '#000',
    textDecorationLine: 'underline',
  },
});
