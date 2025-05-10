import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CountdownTimer from '../../components/countdown/CountdownTimer';

export default function CountdownScreen({ navigation }) {
  const [isPlaying] = useState(true);

  const handleComplete = () => {
    navigation.replace('RunningPage');
    return { shouldRepeat: false };
  };

  return (
    <View style={styles.container}>
      <CountdownTimer
        isPlaying={isPlaying}
        onComplete={handleComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
