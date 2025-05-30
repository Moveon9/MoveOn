import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

export default function RecordDetailPage() {
  const route = useRoute();
  const { record } = route.params;

  const formatTime = (timeStr) => {
    return timeStr || '00:00:00';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titleCentered}>{record.date}의 기록</Text>
        </View>

        {/* 칸 수 */}
        <View style={styles.gridBox}>
          <Text style={styles.gridLabel}>오늘 채운 칸의 수</Text>
          <Text style={styles.gridValue}>
            {record.grid_count || 0}
            <Text style={styles.gridUnit}> 칸</Text>
          </Text>
        </View>

        {/* 기록 요약 */}
        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>달린 시간</Text>
            <Text style={styles.statValue}>{formatTime(record.run_time)}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>거리</Text>
            <Text style={styles.statValue}>{record.distance}m</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>걸음 수</Text>
            <Text style={styles.statValue}>{record.steps.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>평균 심박수</Text>
            <Text style={styles.statValue}>{record.hrate}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>칼로리</Text>
            <Text style={styles.statValue}>{record.calorie.toLocaleString()} kcal</Text>
          </View>
          <View style={styles.statBlock}></View>
        </View>

        {/* 지도 이미지 */}
        {record.imagePath && (
          <Image
            source={{ uri: `http://54.79.175.116/${record.imagePath}` }}
            style={styles.mapImage}
            resizeMode="cover"
          />
        )}

        {/* 메모 */}
        <View style={styles.memoBox}>
          <Text style={styles.memoLabel}>Memo</Text>
          <Text style={styles.memoText}>
            {record.memo || '메모가 없습니다.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleCentered: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gridBox: {
    alignItems: 'left',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  gridLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 48,
    color: '#000',
  },
  gridUnit: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 24,
    marginBottom: 25,
  },
  statBlock: {
    alignItems: 'left',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    color: '#000',
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginVertical: 24,
  },
  memoBox: {
    marginBottom: 16,
  },
  memoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  memoText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});
