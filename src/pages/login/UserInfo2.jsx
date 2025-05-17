import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function UserInfo2({ navigation }) {
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [timeOpen, setTimeOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [weightFocused, setWeightFocused] = useState(false);
  const [timeItems, setTimeItems] = useState([
    { label: '1시간 이하', value: 'under_1h' },
    { label: '1-2시간', value: '1_2h' },
    { label: '2-3시간', value: '2_3h' },
    { label: '3-4시간', value: '3_4h' },
    { label: '4시간 이상', value: 'over_4h' },
  ]);

  const handleNext = () => {
    if (weight && selectedTime && gender) {
      navigation.navigate('UserInfoComplete');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleNext}
            disabled={!weight || !selectedTime || !gender}
          >
            <Text
              style={[
                styles.nextText,
                (!weight || !selectedTime || !gender) && styles.nextTextDisabled,
              ]}
            >
              다음
            </Text>
          </TouchableOpacity>
        </View>

        {/* 이미지 */}
        <Image
          source={require('../../assets/image/common/LogRabbit.png')}
          style={styles.image}
        />

        {/* 몸무게 */}
        <Text style={styles.label}>몸무게</Text>
        <TextInput
          style={[styles.input, weightFocused && styles.inputFocused]}
          placeholder="ex) 56"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          onFocus={() => setWeightFocused(true)}
          onBlur={() => setWeightFocused(false)}
        />

        {/* 선호 시간 */}
        <Text style={styles.label}>선호 시간</Text>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={timeOpen}
            value={selectedTime}
            items={timeItems}
            setOpen={setTimeOpen}
            setValue={setSelectedTime}
            setItems={setTimeItems}
            placeholder="시간을 선택해주세요"
            style={[styles.dropdown, timeOpen && styles.inputFocused]}
            textStyle={{ fontSize: 14 }}
            dropDownContainerStyle={{ borderColor: '#ccc' }}
          />
        </View>

        {/* 성별 */}
        <Text style={styles.label}>성별</Text>
        <View style={styles.genderRow}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'male' && styles.genderSelected,
            ]}
            onPress={() => setGender('male')}
          >
            <Text style={gender === 'male' ? styles.genderTextSelected : styles.genderText}>
              남성
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'female' && styles.genderSelected,
            ]}
            onPress={() => setGender('female')}
          >
            <Text style={gender === 'female' ? styles.genderTextSelected : styles.genderText}>
              여성
            </Text>
          </TouchableOpacity>
        </View>
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
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  nextText: {
    fontSize: 16,
    color: '#398342',
    fontWeight: '600',
  },
  nextTextDisabled: {
    color: '#ccc',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 8,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  genderSelected: {
    backgroundColor: '#398342',
    borderColor: '#398342',
  },
  genderText: {
    color: '#000',
  },
  genderTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  inputFocused: {
    borderColor: '#398342',
  },
});
