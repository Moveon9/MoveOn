import React, { useState } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

export default function ChallengePage() {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();

  const handleSelect = (type) => {
    setSelected(prev => (prev === type ? null : type));
  };

  const handleComplete = () => {
    if (selected === 'marathon') {
      navigation.navigate('MarathonBoard');
    }
  };

  return (
    <Container>
      <Header>
        <Logo source={require('../assets/image/common/LogoLetter.png')} />
      </Header>

      <Title>이용하실 Challenge를{'\n'}선택해주세요.</Title>

      <ButtonRow>
        <ChallengeButton isSelected={selected === 'game'} onPress={() => handleSelect('game')}>
          <Icon source={require('../assets/ic_game.png')} />
          <ButtonText>땅따먹기</ButtonText>
        </ChallengeButton>

        <ChallengeButton isSelected={selected === 'marathon'} onPress={() => handleSelect('marathon')}>
          <Icon source={require('../assets/ic_shoes.png')} />
          <ButtonText>미니 마라톤</ButtonText>
        </ChallengeButton>
      </ButtonRow>

      <SelectButton isActive={selected !== null} onPress={handleComplete}>
        <SelectButtonText>선택</SelectButtonText>
      </SelectButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
`;

const Header = styled.View`
  width: 100%;
  padding: 10px;
  margin-top: 3px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 150px;
  height: 35px;
  resize-mode: contain;
`;

const Title = styled.Text`
  font-size: 23px;
  color: #000;
  text-align: center;
  margin: 60px 0 0;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  margin-top: 20px;
  justify-content: center;
`;

const ChallengeButton = styled.TouchableOpacity`
  width: 158px;
  height: 207px;
  background-color: ${({ isSelected }) => (isSelected ? '#398342' : 'gray')};
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  border-radius: 10px;
`;

const Icon = styled.Image`
  width: 77px;
  height: 77px;
  margin-bottom: 8px;
  resize-mode: contain;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
`;

const SelectButton = styled.TouchableOpacity`
  width: 150px;
  height: 50px;
  background-color: ${({ isActive }) => (isActive ? '#398342' : 'gray')};
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
`;

const SelectButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
`;
