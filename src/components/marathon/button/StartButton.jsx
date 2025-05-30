// src/components/marathon/StartButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function StartButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>출발하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
    backgroundColor: '#398342',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    height: 65,
  },
  buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});
