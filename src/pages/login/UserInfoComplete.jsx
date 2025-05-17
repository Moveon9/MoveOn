import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default function UserInfoComplete({ navigation }) {
  const handleStart = () => {
    navigation.replace('MainTabs'); // 메인 페이지로 이동
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/image/common/LogRabbit.png')}
          style={styles.image}
        />
        <Text style={styles.text}>
          이제 준비가 됐어요!{'\n'}첫 땅을 정복하러 가볼까요?
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>시작하기</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  image: {
    width: 250, 
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 25, 
    color: '#000',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 48,
    fontWeight : '580',
  },
  button: {
    backgroundColor: '#398342',
    paddingVertical: 20, 
    paddingHorizontal: 130, 
    borderRadius: 14,
    marginBottom : 90,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, 
    fontWeight: '700',
  },
});
