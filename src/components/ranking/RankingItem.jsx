import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const badgeIcons = {
  gold: require('../../assets/image/ranking/ic_gold_medal.png'),
  silver: require('../../assets/image/ranking/ic_silver_medal.png'),
  bronze: require('../../assets/image/ranking/ic_bronze_medal.png'),
};

const RankingItem = ({ rank, name, count, badge, highlight }) => {
    let medal = null;
    if (rank === 1) medal = 'gold';
    else if (rank === 2) medal = 'silver';
    else if (rank === 3) medal = 'bronze';
    return (
        <View style={[styles.container, highlight && styles.highlight]}>
            {/* 랭킹 번호 or 메달 */}
            <View style={styles.rankWrapper}>
                {medal ? (
                    <Image source={badgeIcons[medal]} style={styles.rankIcon} />
                ) : (
                    <Text style={styles.rank}>{rank}</Text>
                )}
            </View>
          {/* 프로필, 이름, 칸 수 */}
            <Image
                source={require('../../assets/image/ranking/ic_default_profile.png')}
                style={styles.icon}
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.count}>{count}칸</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 16,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rankWrapper: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    highlight: {
        backgroundColor: '#eef6ec',
        borderWidth: 1,
        borderColor: '#6fa97c',
    },
    rank: { fontWeight: '600', fontSize: 16, textAlign: 'center',},
    icon: { width: 32, height: 32, marginRight: 12, borderRadius: 16,},
    rankIcon: { width: 18, height: 18, resizeMode: 'contain', },
    name: { flex: 1 ,fontSize: 16, color: '#000',},
    count: { fontWeight: '600' },
});

export default RankingItem;
