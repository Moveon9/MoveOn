// components/running/SpeedWarningModal.jsx
import React from 'react';
import { Modal, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SpeedWarningModal({
  visible,
  threshold,
  onStop,
  onContinue,
  onRequestClose,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image
            source={require('../../assets/image/common/LogRabbit.png')}
            style={styles.modalImage}
          />
          <Text style={styles.modalTitle}>
            혹시 자동차나 자전거를 타고 계시나요?
          </Text>
          <Text style={styles.modalMessage}>
            속도가 너무 빠르면 기록이 일시정지 됩니다.{'\n'}
            "Move on"은 러닝 앱으로 {'\n'}걷거나 뛰어야 기록이 됩니다.
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalBtnCancel} onPress={onStop}>
              <Text style={styles.modalTextCancel}>기록 끝내기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtnContinue} onPress={onContinue}>
              <Text style={styles.modalTextContinue}>계속하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  modalBtnCancel: {
    flex: 1,
    backgroundColor: '#818682',
    padding: 10,
    borderRadius: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  modalTextCancel: {
    color: '#fff',
    fontSize: 16,
  },
  modalBtnContinue: {
    flex: 1,
    backgroundColor: '#398342',
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTextContinue: {
    color: '#fff',
    fontSize: 16,
  },
});
