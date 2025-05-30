import React from 'react';
import  {Text, View, StyleSheet} from 'react-native';

export default function TimerHeader({ elapsedTime }) {
    return (
      <View style={styles.timeHeader}>
        <Text style={styles.timeText}>{elapsedTime}</Text>
      </View>
    );
  }
  
  
const styles = StyleSheet.create({
  timeHeader: {
    position: 'absolute',
    marginTop: 30,
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  timeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
  },
});
