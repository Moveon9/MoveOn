import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainUI({ onStartPress }) {
  return (
    <View style={styles.mainUI}>
      <Text style={styles.title}>오늘 기록</Text>
      <Text style={styles.area}>현재 나의 영역 - 50칸</Text>
      <TouchableOpacity 
        style={styles.startButton}
        onPress={onStartPress}
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainUI: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  area: {
    fontSize: 18,
    color: '#666',
  },
  startButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#398342',
    borderRadius: 30,
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});