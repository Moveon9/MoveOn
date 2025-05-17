import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function LoginPage({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 처리 로직 (예: 서버 요청 등)
    navigation.replace('MainTabs'); // 로그인 성공 시 메인으로 이동
  };

  return (
    <View style={styles.container}>
      {/* 상단 이미지 */}
      <Image
        source={require('../../assets/image/common/LogRabbit.png')}
        style={styles.image}
      />

      {/* 닉네임 입력 */}
      <TextInput
        style={[styles.input, nickname && styles.inputActive]}
        placeholder="닉네임"
        value={nickname}
        onChangeText={setNickname}
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  inputActive: {
    borderColor: '#398342',
  },
  loginButton: {
    backgroundColor: '#398342',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
