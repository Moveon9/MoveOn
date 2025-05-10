import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CountdownTimer from '../../components/countdown/CountdownTimer';

export default function CountdownScreen() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <View style={styles.container}>
      <CountdownTimer
        isPlaying={isPlaying}
        onComplete={() => ({ shouldRepeat: false })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
