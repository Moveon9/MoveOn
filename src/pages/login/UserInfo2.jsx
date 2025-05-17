import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function UserInfoPage2({ route, navigation }) {
    const [distance, setDistance] = useState();
    const [distanceOpen, setDistanceOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);
    const [time, setTime] = useState(null);
    const [distanceItems, setDistanceItems] = useState([
        { label: '1km', value: '1' },
        { label: '3km', value: '3' },
        { label: '5km', value: '5' },
        { label: '10km', value: '10' },
    ]);

    const [timeItems, setTimeItems] = useState([
        { label: '아침', value: 'morning' },
        { label: '낮', value: 'noon' },
        { label: '저녁', value: 'evening' },
    ]);

    const handleNext = () => {
        navigation.navigate('MainTabs');
    };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/image/common/LogRabbit.png')} style={styles.image} />
      <Text style={styles.label}>선호 거리</Text>
      <DropDownPicker
        open={distanceOpen}
        value={distance}
        items={distanceItems}
        setOpen={setDistanceOpen}
        setValue={setDistance}
        setItems={setDistanceItems}
        placeholder="거리를 선택해주세요"
        style={styles.dropdown}
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text style={styles.label}>선호 시간</Text>
      <DropDownPicker
        open={timeOpen}
        value={time}
        items={timeItems}
        setOpen={setTimeOpen}
        setValue={setTime}
        setItems={setTimeItems}
        placeholder="시간을 선택해주세요"
        style={styles.dropdown}
        zIndex={2000}
        zIndexInverse={2000}
      />

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={{ color: 'white' }}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { padding: 24, backgroundColor: 'white', flexGrow: 1 },
    image: { width: 100, height: 100, alignSelf: 'center', marginBottom: 30 },
    label: { fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
    dropdown: {
      borderColor: '#ccc',
      marginBottom: 12,
    },
  nextBtn: {
    marginTop: 30,
    backgroundColor: '#3c6e47',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
  },
});
