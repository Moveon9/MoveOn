// FriendInvitation.jsx
import React, { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import FriendItem from '../../components/groundchallenge/FriendItem';

const mockFriends = [
  { id: '1', nickname: '윤지석' },
  { id: '2', nickname: '이서정' },
  { id: '3', nickname: '동길홍' },
  { id: '4', nickname: '윤석지' },
  { id: '5', nickname: '전경훈' },
  { id: '6', nickname: '전승우' },
];

export default function GameInvitationPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const filteredFriends = mockFriends.filter(friend =>
    friend.nickname === debouncedSearch
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.spacer} /> {/* 왼쪽 공간 확보용 */}
          <Text style={styles.title}>상대 초대</Text>
          <Text style={styles.selectText}>선택</Text> {/* 오른쪽 정렬 */}
        </View>

        {/* SearchBar */}
        <TextInput
          style={styles.searchBar}
          placeholder="닉네임 검색"
          placeholderTextColor="#999"
          value={search}
          onChangeText={text => setSearch(text.trimStart())}
        />

        {/* Label */}
        <Text style={styles.label}>친구 초대</Text>

        {/* Friend List */}
        <FlatList
          data={filteredFriends}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <FriendItem
              name={item.nickname}
              selected={item.id === selectedId}
              onPress={() => setSelectedId(item.id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  selectText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  spacer: {
    width: 40,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  label: {
    color: '#666',
    marginBottom: 8,
  },
});
