import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import GameParticipationModal from './groundchallenge/GameParticipatioinModal';
import InvitationAlert from '../components/groundchallenge/InvitationAlert'; // 경로에 맞게 조정


export default function ChallengePage() {
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [point, setPoint] = useState('');
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(true); // true: 테스트용
  const [inviteSender, setInviteSender] = useState('홍길동');

  // ChallengePage로 다시 돌아올 때 초기화
  useFocusEffect(
    useCallback(() => {
      setSelected(null);
      setModalVisible(false);
      setPoint('');
    }, [])
  );

  const handleSelect = (type) => {
    setSelected((prev) => (prev === type ? null : type));
  };

  const handleComplete = () => {
    if (selected === 'marathon') {
      navigation.navigate('MarathonBoard');
    } else if (selected === 'game') {
      setModalVisible(true);
    }
  };

  const handleStartGame = () => {
    setModalVisible(false);
    console.log(`게임 시작! 포인트: ${point}`);
    // TODO: 게임 시작 처리 로직 추가
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {showAlert && <InvitationAlert nickname={inviteSender} onDismiss={() => setShowAlert(false)} />}

        <View style={styles.header}>
          <Image
            source={require('../assets/image/common/LogoLetter.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.middleContent}>
          <Text style={styles.title}>
            이용하실 Challenge를{'\n'}선택해주세요.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.challengeButton,
                selected === 'game' && styles.selectedButton,
              ]}
              onPress={() => handleSelect('game')}
            >
              <Image
                source={require('../assets/image/challenge/ic_GroundSelect.png')}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>땅따먹기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.challengeButton,
                selected === 'marathon' && styles.selectedButton,
              ]}
              onPress={() => handleSelect('marathon')}
            >
              <Image
                source={require('../assets/image/challenge/ic_MarathonSelect.png')}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>미니 마라톤</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.selectButton,
              selected !== null && styles.activeSelectButton,
            ]}
            onPress={handleComplete}
          >
            <Text style={styles.selectButtonText}>선택</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 모달 컴포넌트 */}
      <GameParticipationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onStart={handleStartGame}
        point={point}
        setPoint={setPoint}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 35,
    resizeMode: 'contain',
    marginTop: 10,
  },
  middleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 30,
  },
  title: {
    fontSize: 23,
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  challengeButton: {
    width: 158,
    height: 207,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#398342',
  },
  icon: {
    width: 77,
    height: 77,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  selectButton: {
    width: 150,
    height: 50,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
  },
  activeSelectButton: {
    backgroundColor: '#398342',
  },
  selectButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});
