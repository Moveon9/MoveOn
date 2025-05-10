import React from 'react';
import { View } from 'react-native';
import RankingItem from './RankingItem';

const mockData = [
  { rank: 1, name: '윤지석', count: 80, badge: 'gold' },
  { rank: 2, name: '전승우', count: 76, badge: 'silver' },
  { rank: 3, name: '전경훈', count: 70, badge: 'bronze' },
  { rank: 4, name: 'Me', count: 50, highlight: true },
  { rank: 5, name: '이서정', count: 43 },
  { rank: 6, name: '홍길동', count: 40 },
];

const RankingList = () => {
  return (
    <View>
      {mockData.map((item) => (
        <RankingItem key={item.rank} {...item} />
      ))}
    </View>
  );
};

export default RankingList;
