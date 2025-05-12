import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../../assets/image/nav/ic_RunningNavButton.svg';
import ChallengeIcon from '../../assets/image/nav/ic_ChallengeNavButton.svg';
import RankingIcon from '../../assets/image/nav/ic_RankingNavButton.svg';
import ProfileIcon from '../../assets/image/nav/ic_MyNavButton.svg';

export default function TabBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('MainTabs')}>
        <HomeIcon width={24} height={24} color="#398342" />
        <Text style={[styles.tabText, styles.activeText]}>러닝</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('MainTabs')}>
        <ChallengeIcon width={24} height={24} color="gray" />
        <Text style={styles.tabText}>챌린지</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('MainTabs')}>
        <RankingIcon width={24} height={24} color="gray" />
        <Text style={styles.tabText}>랭킹</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('MainTabs')}>
        <ProfileIcon width={24} height={24} color="gray" />
        <Text style={styles.tabText}>마이페이지</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    zIndex: 999
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4
  },
  activeText: {
    color: '#398342'
  }
});