import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
 // 또는 이미지 사용 가능
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const getWeekRange = (offset = 0) => {
    const target = dayjs().subtract(offset, 'week');
    const startOfWeek = target.startOf('isoWeek'); // 일요일
    const endOfWeek = target.endOf('isoWeek');     // 토요일
  
    const startStr = startOfWeek.format('YYYY.MM.DD');
    const endStr = endOfWeek.format('DD');
    return `${startStr}~${endStr}`;
  };



const DateSelector = ({ onChange }) => {
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const w = [getWeekRange(0), getWeekRange(1)];
    setWeeks(w);
    setSelectedWeek(w[0]);
    if (onChange) onChange(w[0]);
  }, []);
  const handleSelect = (week) => {
    setSelectedWeek(week);
    setModalVisible(false);
    if (onChange) onChange(week);
  };

  return (
    <View style={styles.container}>
      {/* 선택창 */}
      <TouchableOpacity style={styles.selector} onPress={() => setOpen(!open)}>
        <Text style={styles.text}>{selectedWeek}</Text>
        <Text style={styles.icon}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {/* 펼쳐지는 리스트 */}
      {open && (
        <View style={styles.dropdown}>
          {weeks.map((week, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(week)}
              style={styles.item}
            >
              <Text style={styles.text}>{week}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    color: '#000',
    textAlign: 'left',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    zIndex: 10,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    marginLeft: 4,
  },
});

export default DateSelector;
