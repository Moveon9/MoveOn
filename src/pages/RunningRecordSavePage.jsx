import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import MapViewComponent from '../components/map/MapViewComponent';
import TabBar from '../components/running/TabBar';

export default function RunningRecordSavePage({ navigation, route }) {
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일`;
  
  // route.params로부터 운동 데이터를 받아옴
  const {
    gridCount = 80,
    duration = "00:12:23",
    distance = "50m",
    steps = "10,000",
    heartRate = "-",
    calories = "3,050",
    region,
  } = route.params || {};

  const handleSave = () => {
    // TODO: 저장 로직 구현
    navigation.goBack();
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/image/running/ic_back_button.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{formattedDate}의 기록</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>저장</Text>
        </TouchableOpacity>
      </View>

      {/* 칸 수 섹션 */}
      <View style={styles.gridSection}>
        <Text style={styles.gridTitle}>오늘 채운 칸의 수</Text>
        <View style={styles.gridCountContainer}>
          <Text style={styles.gridCount}>{gridCount}</Text>
          <Text style={styles.gridUnit}>칸</Text>
        </View>
      </View>

      {/* 러닝 통계 */}
      <View style={styles.statsSection}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>달린 시간</Text>
            <Text style={styles.statValue}>{duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>거리</Text>
            <Text style={styles.statValue}>{distance}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>걸음 수</Text>
            <Text style={styles.statValue}>{steps}</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>평균 심박수</Text>
            <Text style={styles.statValue}>{heartRate}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>칼로리</Text>
            <Text style={styles.statValue}>{calories}kcal</Text>
          </View>
          <View style={styles.statItem} /> {/* 빈 아이템으로 정렬 맞춤 */}
        </View>
      </View>

      {/* 지도 */}
      <View style={styles.mapContainer}>
        <MapViewComponent
          region={region}
          onRegionChange={() => {}}
          style={styles.map}
        />
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 메모 입력 */}
      <View style={styles.memoSection}>
        <Text style={styles.memoTitle}>Memo</Text>
        <TextInput
          style={styles.memoInput}
          placeholder="Memo를 적어주세요."
          multiline
          textAlignVertical="top"
        />
      </View>
      </View>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 60 // TabBar height
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  saveButton: {
    fontSize: 16,
    color: '#4CAF50',
  },
  gridSection: {
    paddingHorizontal: 18,
    marginTop: 30,
  },
  gridTitle: {
    fontSize: 16,
    color: '#535252',
    marginBottom: 8,
  },
  gridCountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  gridCount: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000000',
  },
  gridUnit: {
    fontSize: 20,
    color: '#535252',
    marginLeft: 4,
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  statsSection: {
    paddingHorizontal: 18,
    marginTop: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#535252',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  mapContainer: {
    height: 200,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#D4D6DD',
    marginVertical: 16,
  },
  memoSection: {
    padding: 16,
  },
  memoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  memoInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
  },
});