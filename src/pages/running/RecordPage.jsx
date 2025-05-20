import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { saveRunRecord } from '../../api/recordApi'; // 상대경로에 맞게 조정


export default function RecordPage({ route }) {
  const navigation = useNavigation();
  const {
    filledGridCount,
    elapsedTime,
    totalDistance,
    stepCount,
    heartRateAvg,
    caloriesBurned,
    mapCapture,
  } = route.params;
  const [memoText, setMemoText] = useState('');
  
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleSave = async () => {
    try {
      const record = {
        date: new Date().toISOString().slice(0, 10), // 예: "2025-05-20"
        steps: stepCount,
        distance: totalDistance,
        run_time: formatTime(elapsedTime),
        memo: memoText, // TextInput 상태로 관리 중인 memo 텍스트
        userId: 3,       // 로그인 사용자 ID
        calorie: caloriesBurned,
        hrate: heartRateAvg,
      };
  
      const result = await saveRunRecord(record);
      console.log('✅ 저장 성공:', result);
      // navigation.goBack() 등 후속 처리 가능
    } catch (err) {
      console.error('❌ 저장 실패:', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          {/* 저장 버튼 */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.save}>저장</Text>
          </TouchableOpacity>

          {/* 중앙 타이틀 */}
          <Text style={styles.titleCentered}>12월 19일의 기록</Text>
        </View>

        {/* 칸 수 */}
        <View style={styles.gridBox}>
          <Text style={styles.gridLabel}>오늘 채운 칸의 수</Text>
          <Text style={styles.gridValue}>
            {filledGridCount}
            <Text style={styles.gridUnit}> 칸</Text>
          </Text>
        </View>

        {/* 기록 요약 */}
        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>달린 시간</Text>
            <Text style={styles.statValue}>{formatTime(elapsedTime)}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>거리</Text>
            <Text style={styles.statValue}>{totalDistance}m</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>걸음 수</Text>
            <Text style={styles.statValue}>{stepCount.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>평균 심박수</Text>
            <Text style={styles.statValue}>{heartRateAvg}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>칼로리</Text>
            <Text style={styles.statValue}>{caloriesBurned.toLocaleString()} kcal</Text>
          </View>
          <View style={styles.statBlock}></View> {/* 빈칸 */}
        </View>

        {/* 지도 이미지 */}
        {mapCapture && (
          <Image
            source={{ uri: mapCapture }}
            style={styles.mapImage}
            resizeMode="cover"
          />
        )}

        {/* 메모 */}
        <View style={styles.memoBox}>
          <Text style={styles.memoLabel}>Memo</Text>
          <TextInput
            placeholder="Memo를 적어주세요."
            multiline
            value={memoText}
            onChangeText={setMemoText}
            style={styles.memoInput}
          />
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
    position: 'relative',
    marginBottom: 24,
  },
  titleCentered: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    position: 'absolute',
    right: 16, // 오른쪽에 고정
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  save: {
    fontSize: 16,
    color: '#398342',
    fontWeight: 'bold',
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
    flex: 1, // 균등 너비
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
  memoInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#000',
  },
});
