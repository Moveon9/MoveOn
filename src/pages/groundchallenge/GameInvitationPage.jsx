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
  TouchableOpacity,
} from 'react-native';
import FriendItem from '../../components/groundchallenge/FriendItem';
import WaitingScreen from './WaitingScreen';

export default function GameInvitationPage({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [showWaiting, setShowWaiting] = useState(false);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [isSelf, setIsSelf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const { nickname: myNickname } = useUser();

  // API를 통한 사용자 검색
  useEffect(() => {
    if (!debouncedSearch) {
      setFilteredFriends([]);
      setIsSelf(false);
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);
      
      // 자기 자신을 검색한 경우
      if (debouncedSearch === myNickname) {
        setFilteredFriends([]);
        setIsSelf(true);
        setIsLoading(false);
        return;
      }

      try {
        const userId = await getUserByNickname(debouncedSearch);
        if (userId) {
          setFilteredFriends([{ id: userId, nickname: debouncedSearch }]);
          setIsSelf(false);
        } else {
          setFilteredFriends([]);
          setIsSelf(false);
        }
      } catch (error) {
        console.error('사용자 검색 오류:', error);
        setFilteredFriends([]);
        setIsSelf(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [debouncedSearch, myNickname]);

  // 선택된 친구 정보 가져오기
  const selectedFriend = filteredFriends.find(friend => friend.id === selectedId);

  const handleSelectPress = () => {
    if (selectedId && !isSelf) {
      setShowWaiting(true);
    }
  };

  const handleCloseWaiting = () => {
    setShowWaiting(false);
    setSelectedId(null);
  };

  const handleGameStart = () => {
    setShowWaiting(false);
    navigation.navigate('GameMap', { 
      opponent: selectedFriend?.nickname || '상대방' 
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (showWaiting) {
    return (
      <WaitingScreen 
        onClose={handleCloseWaiting} 
        onGameStart={handleGameStart}
        selectedFriend={selectedFriend}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>상대 초대</Text>
          <TouchableOpacity 
            onPress={handleSelectPress}
            disabled={!selectedId || isSelf}
            style={styles.selectButton}
          >
            <Text style={[
              styles.selectText, 
              (selectedId && !isSelf) ? styles.selectTextActive : styles.selectTextDisabled
            ]}>
              선택
            </Text>
          </TouchableOpacity>
        </View>

        {/* SearchBar */}
        <TextInput
          style={styles.searchBar}
          placeholder="닉네임 검색"
          placeholderTextColor="#999"
          value={search}
          onChangeText={text => setSearch(text.trimStart())}
          clearButtonMode="while-editing"
        />

        {/* Label */}
        <Text style={styles.label}>친구 초대</Text>

        {/* 자기 자신 검색 경고 */}
        {isSelf && (
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>자기 자신과는 게임할 수 없습니다.</Text>
          </View>
        )}

        {/* Friend List */}
        <FlatList
          data={filteredFriends}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <FriendItem
              name={item.nickname}
              selected={item.id === selectedId}
              onPress={() => setSelectedId(item.id)}
              disabled={isSelf}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            if (isLoading) {
              return (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>검색 중...</Text>
                </View>
              );
            }
            
            if (search && !isSelf) {
              return (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
                </View>
              );
            }
            
            if (!search) {
              return (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>닉네임을 검색해주세요.</Text>
                </View>
              );
            }
            
            return null;
          }}
        />

        {/* 선택된 친구 정보 표시 */}
        {selectedFriend && !isSelf && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedText}>
              선택됨: {selectedFriend.nickname}
            </Text>
          </View>
        )}
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
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 24,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  selectButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 16,
  },
  selectTextActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  selectTextDisabled: {
    color: '#CCCCCC',
  },
  searchBar: {
    height: 44,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    color: '#666',
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  warningContainer: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  warningText: {
    color: '#D00',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  selectedInfo: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  selectedText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
