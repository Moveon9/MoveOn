// src/components/marathon/OffCourseModal.jsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function OffCourseModal({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Image source={require('../../../assets/image/common/LogRabbit.png')} style={styles.image} />
          <Text style={styles.text}>경로를 이탈했습니다!</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  image: { width: 100, height: 100, marginBottom: 20 },
  text: { fontSize: 15, fontWeight: 'bold' },
  button: {
    marginTop: 25,
    backgroundColor: '#398342',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});
