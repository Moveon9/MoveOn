import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const badgeIcons = {
  gold: require('../../assets/image/ranking/ic_gold_medal.png'),
  silver: require('../../assets/image/ranking/ic_silver_medal.png'),
  bronze: require('../../assets/image/ranking/ic_bronze_medal.png'),
};

const RankingItem = ({ rank, name, count, badge, highlight }) => (
  <View style={[styles.container, highlight && styles.highlight]}>
    <Text style={styles.rank}>{rank}</Text>
    <Image
      source={require('../../assets/image/ranking/ic_default_profile.png')}
      style={styles.icon}
    />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.count}>{count}칸</Text>
    {badge && <Image source={badgeIcons[badge]} style={styles.badge} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlight: {
    backgroundColor: '#eef6ec',
    borderWidth: 1,
    borderColor: '#6fa97c',
  },
  rank: { width: 30, fontWeight: 'bold', fontSize: 16 },
  icon: { width: 32, height: 32, marginHorizontal: 8 },
  name: { flex: 1 },
  count: { fontWeight: '600' },
  badge: { width: 20, height: 20, marginLeft: 8 },
});

export default RankingItem;
