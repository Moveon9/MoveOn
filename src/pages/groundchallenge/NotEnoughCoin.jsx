import React, { useContext } from 'react';
import PointContext from '../../context/PointContext';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function NotEnoughCoin({ visible, onClose }) {
  const { point } = useContext(PointContext); 

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>코인이 부족합니다!</Text>
          <Text style={styles.label}>잔여 포인트 : {point}</Text>
          <TouchableOpacity style={styles.actionButton} onPress={onClose}>
            <Text style={styles.buttonText}>다음에 하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#398342',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
