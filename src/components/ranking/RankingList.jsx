import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import RankingItem from './RankingItem';
import { fetchRankingData } from '../../api/ranking';
import { fetchUserInfo } from '../../api/userApi';

const mockData = [
  { rank: 1, name: '윤지석', count: 80, badge: 'gold' },
  { rank: 2, name: '전승우', count: 76, badge: 'silver' },
  { rank: 3, name: '전경훈', count: 70, badge: 'bronze' },
  { rank: 4, name: 'Me', count: 50, highlight: true },
  { rank: 5, name: '이서정', count: 43 },
  { rank: 6, name: '홍길동', count: 40 },
];

const RankingList = () => {
  const [rankingData, setRankingData] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError] = useState(null);

  const userId = 0;

  useEffect(() => {
    const fetchData = async() => {
      try {
        const userId = 1;
        const user = await fetchUserInfo(userId);
      } catch (err) {
        setError(err.message);
      }
      fetchData();
  }}, []);

  useEffect(() => {
    fetchRankingData().then((data) => {
      const sorted = [...data].sort((a,b) => b.cout - a.count);

      const ranked = sorted.map((item, index) => ({
        ...item,
        rank: index + 1,
        highlight: item.name === user.nickname,
        name: item.name == user.nickname ? 'Me' : item.name,
      }));
      setRankingData(ranked);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>에러 발생: {error}</Text>

  return (
    <View>
      {rank.map((item) => (
        <RankingItem key={item.rank} {...item} />
      ))}
    </View>
  );
};

export default RankingList;
