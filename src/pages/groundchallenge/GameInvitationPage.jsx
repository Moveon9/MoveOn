import React, { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { getUserByNickname } from '../../api/userApi';
import { useUser } from '../../context/UserContext';

import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import FriendItem from '../../components/groundchallenge/FriendItem';

export default function GameInvitationPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [isSelf, setIsSelf] = useState(false); // ✅ 자기 자신 여부 상태
  const debouncedSearch = useDebounce(search, 300);

  const { nickname: myNickname } = useUser();

  useEffect(() => {
    if (!debouncedSearch) {
      setFilteredFriends([]);
      setIsSelf(false);
      return;
    }

    const fetchUser = async () => {
      if (debouncedSearch === myNickname) {
        setFilteredFriends([]);
        setIsSelf(true); // ✅ 자기 자신 검색됨
        return;
      }

      const userId = await getUserByNickname(debouncedSearch);
      if (userId) {
        setFilteredFriends([{ id: userId, nickname: debouncedSearch }]);
        setIsSelf(false);
      } else {
        setFilteredFriends([]);
        setIsSelf(false);
      }
    };

    fetchUser();
  }, [debouncedSearch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.spacer} />
          <Text style={styles.title}>상대 초대</Text>
          <Text style={styles.selectText}>선택</Text>
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
          keyExtractor={item => item.id.toString()}
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
  warning: {
    color: '#D00',
    marginBottom: 12,
  },
});
