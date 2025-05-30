import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchRunRecords } from '../../api/recordApi';

export default function RecordListPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { selectedDate } = route.params;

  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    // 🚀 서버에서 기록 목록 요청
    const loadRecords = async () => {
      try {
        const data = await fetchRunRecords({
            date: selectedDate,
            userId:0
        });
        console.log('기록 목록:', data)
        setRecordList(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadRecords();
  }, [selectedDate]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecordDetailPage', { recordId: item })}
    >
      <Text style={styles.cardText}>{item.item_id +1}회차 / {item.run_time} / {item.distance}m</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedDate} 기록 내역</Text>
      <FlatList
        data={recordList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: { fontSize: 16, fontWeight: 'bold' },
});
