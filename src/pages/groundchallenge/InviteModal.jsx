import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Image 
} from 'react-native';
import CountdownTimer from './CountdownTimer';

const ChallengeInviteModal = ({ nickname = '윤지석', onStart, onClose }) => {
  const [showCountdown, setShowCountdown] = useState(false);

  const handleStartPress = () => {
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    if (onStart) {
      onStart();
    }
  };

  if (showCountdown) {
    return (
      <SafeAreaView style={styles.overlay}>
        <CountdownTimer 
          isPlaying={true} 
          onComplete={handleCountdownComplete}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.overlay}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Image
          source={require('../../assets/image/groundchallenge/ic_close.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <Text style={styles.entryText}>{nickname}님이{'\n'}입장하셨습니다.</Text>

        <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
          <Text style={styles.startButtonText}>대결 시작</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.tipText}>
        <Text style={styles.tipLabel}>Tip.</Text> 상대방의 땅을 점령할 수 있습니다.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 24,
    height: 24,
    zIndex: 10,
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  centerContent: {
    alignItems: 'center',
  },
  entryText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 28,
  },
  startButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tipText: {
    fontSize: 13,
    color: '#4A4A4A',
  },
  tipLabel: {
    color: '#2E7D32',
    fontWeight: '500',
  },
});

export default ChallengeInviteModal;
