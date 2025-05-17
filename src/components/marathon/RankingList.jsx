import React from 'react';
import { View } from 'react-native';
import RankingItem from './RankingItem';

const mockData = [
  { rank: 1, name: '윤지석', time: { hour: 1, minute: 20, second: 0 }, badge: 'gold' },
  { rank: 2, name: '전승우', time: { hour: 1, minute: 16, second: 0 }, badge: 'silver' },
  { rank: 3, name: '전경훈', time: { hour: 1, minute: 10, second: 0 }, badge: 'bronze' },
  { rank: 4, name: 'Me',    time: { hour: 0, minute: 50, second: 0 }, highlight: true },
  { rank: 5, name: '이서정', time: { hour: 0, minute: 43, second: 0 } },
  { rank: 6, name: '홍길동', time: { hour: 0, minute: 40, second: 0 } },
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
