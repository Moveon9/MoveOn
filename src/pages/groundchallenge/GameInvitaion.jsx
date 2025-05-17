// FriendInvitation.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import FriendItem from './FriendItem';

const mockFriends = [
  { id: '1', name: '윤지석' },
  { id: '2', name: '이서정' },
  { id: '3', name: '동길홍' },
  { id: '4', name: '윤석지' },
  { id: '5', name: '전경훈' },
  { id: '6', name: '전승우' },
];

export default function FriendInvitation() {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');

  const filteredFriends = mockFriends.filter(friend =>
    friend.name.includes(search)
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.closeBtn}>X</Text>
        <Text style={styles.title}>상대 초대</Text>
        <Text style={styles.selectText}>선택</Text>
      </View>

      {/* SearchBar */}
      <TextInput
        style={styles.searchBar}
        placeholder="닉네임 검색"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      {/* Label */}
      <Text style={styles.label}>주변 친구</Text>

      {/* Friend List */}
      <FlatList
        data={filteredFriends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FriendItem
            name={item.name}
            selected={item.id === selectedId}
            onPress={() => setSelectedId(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeBtn: {
    fontSize: 24,
    color: '#4A4A4A',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectText: {
    fontSize: 16,
    color: '#4A4A4A',
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
