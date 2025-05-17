import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';

export default function UserInfoPage1({ navigation }) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  const handleNext = () => {
    if (!name.trim()) {
        alert('이름을 입력해주세요.');
        return;
    }
    
    if (!weight.trim()) {
        alert('몸무게를 입력해주세요.');
        return;
    }
    
    if (!gender) {
        alert('성별을 선택해주세요.');
        return;
    }
    navigation.navigate('UserInfo2', { name, weight, gender });
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container}>
        <Image source={require('../../assets/image/common/LogRabbit.png')} style={styles.image} />

        <Text style={styles.label}>이름</Text>
        <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요"
            value={name}
            onChangeText={setName}
        />

        <Text style={styles.label}>몸무게</Text>
        <TextInput
            style={styles.input}
            placeholder="ex) 56"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
        />

        <Text style={styles.label}>성별</Text>
        <View style={styles.genderContainer}>
            <TouchableOpacity
            style={[styles.genderBtn, gender === '남성' && styles.genderSelected]}
            onPress={() => setGender('남성')}
            >
            <Text>남성</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.genderBtn, gender === '여성' && styles.genderSelected]}
            onPress={() => setGender('여성')}
            >
            <Text>여성</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={{ color: 'white' }}>다음</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, backgroundColor: 'white' },
  image: { width: 100, height: 100, alignSelf: 'center', marginBottom: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  genderBtn: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: 5,
  },
  genderSelected: {
    backgroundColor: '#d0e8d0',
  },
  nextBtn: {
    marginTop: 20,
    backgroundColor: '#3c6e47',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
  },
  safeareaview: {
    flex: 1,
    height: 776,
    width: "100%",
    backgroundColor: "#fff"
    }, 
});