import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from '../../assets/image/ranking/ic_default_profile.png';

// 시간 포맷 함수 (1 → '01'로 변환)
const formatTime = (num) => num.toString().padStart(2, '0');

const MyRankingCard = ({ rank, name, time }) => {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>나의 순위</Text>
        <Text style={styles.value}>{rank}</Text>
      </View>

      <View style={styles.centerSection}>
        <View style={styles.avatarCircle}>
          <Image source={Profile} style={styles.avatarImage} />
        </View>
        <Text style={styles.centerLabel}>{name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>시간</Text>
        <Text style={styles.value}>
          <Text style={styles.countNumber}>
            {`${formatTime(time.hour)} : ${formatTime(time.minute)} : ${formatTime(time.second)}`}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#398342',
    marginBottom: 12,
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#398342',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#398342',
    fontWeight: '600',
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eaf2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  centerLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#000',
  },
  countNumber: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#398342',
  },
  countUnit: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default MyRankingCard;
