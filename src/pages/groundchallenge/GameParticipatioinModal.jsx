// GameParticipatioinModal.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PointContext from '../../context/PointContext';
import NotEnoughCoin from './NotEnoughCoin';
import { useNavigation } from '@react-navigation/native'; 


export default function GameParticipatioinModal({ visible, onClose, onStart }) {
  const navigation = useNavigation();
  const { point } = useContext(PointContext);
  const [requestedPoint, setRequestedPoint] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showNotEnoughModal, setShowNotEnoughModal] = useState(false);

    useEffect(() => {
    if (visible) {
      setRequestedPoint(''); // 모달 열릴 때 입력값 초기화
    }
  }, [visible]);

  const handleStart = () => {
    const numeric = Number(requestedPoint);
    if (numeric > point) {
      onClose();
      setTimeout(() => setShowNotEnoughModal(true), 100);
    } else {
      onClose();
      navigation.navigate('GameInvitationPage',{point : numeric});
    }
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>게임에 참가하시겠습니까?</Text>

            <Text style={styles.label}>참여 포인트</Text>
            <TextInput
              style={[styles.input, isFocused && styles.inputFocused]}
              placeholder="ex) 0~제한 없음"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={requestedPoint}
              onChangeText={(text) => {
                const numeric = text.replace(/[^0-9]/g, '');
                setRequestedPoint(numeric);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.start]} onPress={handleStart}>
                <Text style={styles.startText}>시작하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 포인트 부족 모달 */}
      <NotEnoughCoin
        visible={showNotEnoughModal}
        onClose={() => setShowNotEnoughModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    fontSize: 24,
    fontWeight: '500',
    paddingVertical: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#4A5660',
    alignSelf: 'center',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    color: '#000',
  },
  inputFocused: {
    borderColor: '#398342',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: '#818682',
    marginRight: 8,
  },
  start: {
    backgroundColor: '#398342',
    marginLeft: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  startText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
