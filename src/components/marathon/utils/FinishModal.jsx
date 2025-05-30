// src/components/marathon/FinishModal.jsx
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FinishModal({ visible, elapsedTime, onClose }) {
  const navigation = useNavigation();

  const handleConfirm = () => {
    onClose(); // 먼저 Modal 닫기
    setTimeout(() => {
      navigation.replace('MainTabs'); // 자연스럽게 MainTabs 이동
    }, 300); // 약간 delay (자연스러운 전환)
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/image/challenge/ic_finish.png')}
            style={styles.icon}
          />
          <Text style={styles.title}>완주 성공!</Text>
          <Text style={styles.label}>기록</Text>
          <Text style={styles.time}>{elapsedTime}</Text>

          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#398342',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#777',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#398342',
    paddingHorizontal: 100,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
