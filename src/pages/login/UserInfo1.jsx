import React, { useState } from 'react';
import axios from 'axios';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

export default function UserInfo1({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [nicknameFocused, setNicknameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const checkNickname = () => {
    if (nickname === '무한이') {
      setNicknameError('*닉네임이 중복입니다.');
      setIsChecked(false);
    } else {
      setNicknameError('');
      setIsChecked(true);
    }
  };

  const handleNext = () => {
    if (nickname && password && isChecked) {
      navigation.navigate('UserInfo2'); // 다음 페이지로 이동
    }
  };

  const isNextEnabled = nickname && password && isChecked;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleNext} disabled={!isNextEnabled}>
            <Text
              style={[
                styles.nextText,
                !isNextEnabled && styles.nextTextDisabled,
              ]}
            >
              다음
            </Text>
          </TouchableOpacity>
        </View>

        {/* 이미지 */}
        <Image
          source={require('../../assets/image/common/LogRabbit.png')}
          style={styles.image}
        />

        {/* 닉네임 */}
        <Text style={styles.label}>닉네임</Text>
        <View
          style={[
            styles.inputRow,
            nicknameError && styles.inputRowError,
            nicknameFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            value={nickname}
            onChangeText={(text) => {
              setNickname(text);
              setIsChecked(false); // 닉네임 수정 시 검사 무효화
            }}
            onFocus={() => setNicknameFocused(true)}
            onBlur={() => setNicknameFocused(false)}
          />
          <TouchableOpacity style={styles.checkButton} onPress={checkNickname}>
            <Text style={styles.checkButtonText}>중복 검사</Text>
          </TouchableOpacity>
        </View>
        {nicknameError ? (
          <Text style={styles.errorText}>{nicknameError}</Text>
        ) : null}

        {/* 비밀번호 */}
        <Text style={styles.label}>비밀번호</Text>
        <View
          style={[
            styles.inputRow,
            passwordFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </View>
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
    padding: 24,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#398342',
  },
  nextTextDisabled: {
    color: '#ccc',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  inputRowError: {
    borderColor: '#E53935',
  },
  inputFocused: {
    borderColor: '#398342',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    paddingHorizontal: 8,
  },
  checkButton: {
    backgroundColor: '#398342',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
});
