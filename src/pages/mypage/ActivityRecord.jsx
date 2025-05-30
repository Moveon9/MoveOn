import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const weeklyData = [
  { day: '월', count: 30 },
  { day: '화', count: 45 },
  { day: '수', count: 0 },
  { day: '목', count: 50 },
  { day: '금', count: 0 },
  { day: '토', count: 0 },
  { day: '일', count: 0 },
];



export default function ActivityRecord() {
  const [selectedDate, setSelectedDate] = useState('2024-12-19');
  const navigation = useNavigation();
  const daysKor = ['월', '화', '수', '목', '금', '토', '일'];
  const weeklyData = useMemo(() => {
    const {weekStart } = getWeekRange(selectedDate);
    return Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + idx);
      return {
        day: daysKor[idx],
        date: date.toISOString().slice(0,10),
        count: Math.floor(Math.random() * 51),
      };
    });
  }, [selectedDate]);
  const { rangeText } = getWeekRange(selectedDate);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>활동 기록</Text>

        {/* Calendar */}
        <Calendar
        renderHeader={(date) => {
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          return (
            <Text style={styles.koreanMonth}>
              {year}년 {month}월
            </Text>
          );
        }}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#398342' },
          }}
          current={selectedDate}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            navigation.navigate('RcordListPage', {
              selectedDate: day.dateString,
            });
          }}
          theme={{
            selectedDayBackgroundColor: '#398342',
            todayTextColor: '#398342',
            arrowColor: '#398342',
          }}
          style={styles.calendar}
        />

        <View style={styles.divider}/>

        {/* Weekly Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>이번 주 칸 수</Text>
          <Text style={styles.weekRange}>{rangeText}</Text>

          <View style={styles.barChart}>
            {weeklyData.map((item, index) => (
              <View key={index} style={styles.barItem}>
                <View
                  style={[styles.bar, { height: item.count * 2 }]} // Scale bar height
                />
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function getWeekRange(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay(); // 0 (Sun) ~ 6 (Sat)
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7)); // 월요일로 맞춤
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const format = (d) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

  return {
    rangeText: `${format(monday)}~${format(sunday)}`,
    weekStart: monday,
  };
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  weekRange: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
  },
  barItem: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: '#cde3d1',
    borderRadius: 4,
    marginBottom: 6,
  },
  barLabel: {
    fontSize: 12,
    color: '#333',
  },
  divider: {
    height: 6,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  }
});
