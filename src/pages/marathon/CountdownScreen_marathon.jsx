import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import CountdownTimer from '../../components/countdown/CountdownTimer';

export default function CountdownScreen_marathon({ navigation, route }) {
  const [isPlaying] = useState(true);
  const [region, setRegion] = useState(null);
  const [speed, setSpeed] = useState(0);
  const { courseCoordinates } = route.params
  // ✅ 위치 미리 받아오기
  useEffect(() => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        if (position.coords.speed) {
          setSpeed((position.coords.speed * 3.6).toFixed(1));
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  // ✅ Countdown 완료 시 위치와 속도 전달
  const handleComplete = () => {
    navigation.replace('MarathonCoursePage', {
      courseCoordinates,
      tracking: true
    });
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
