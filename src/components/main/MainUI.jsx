import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecommendIcon from '../../assets/image/main/ic_recommendation.png';
import RecommendationCard from '../courserecommend/PersonalRecommendation'; // 카드 컴포넌트 import

export default function MainUI({ onStartPress }) {
  const [showCard, setShowCard] = useState(false); // 추천 카드 표시 여부

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.mainUI}>
        {/* 추천 아이콘 버튼 */}
        <TouchableOpacity
          style={styles.recommendIconWrapper}
          onPress={() => setShowCard(!showCard)}
        >
          <Image source={RecommendIcon} style={styles.recommendIcon} />
        </TouchableOpacity>

        {/* 추천 카드 컴포넌트 렌더링 */}
        {showCard && <RecommendationCard />}

        {/* 시작하기 버튼 */}
        <TouchableOpacity style={styles.startButton} onPress={onStartPress}>
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainUI: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  recommendIconWrapper: {
    position: 'absolute',
    top: 8,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
  },
  recommendIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  startButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#398342',
    borderRadius: 16,
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
