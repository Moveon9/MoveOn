import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { loginUser } from '../../api/userApi'; // 로그인 API 함수 import

export default function LoginPage({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginUser({ nickname, password });
      if (res.isSuccess && res.result === true) {
        navigation.replace('MainTabs');
      } else {
        Alert.alert('로그인 실패', res.message || '닉네임 또는 비밀번호를 확인하세요');
      }
    } catch (err) {
      Alert.alert('오류', '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/image/common/LogRabbit.png')}
          style={styles.image}
        />

        <TextInput
          style={[styles.input, nickname && styles.inputActive]}
          placeholder="닉네임"
          value={nickname}
          onChangeText={setNickname}
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'flex-start',
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
