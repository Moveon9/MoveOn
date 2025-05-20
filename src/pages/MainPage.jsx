import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapViewComponent from '../components/map/MapViewComponent';
import MainUI from '../components/main/MainUI';

export default function MainPage({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 37.5665,  // Default to Seoul coordinates
    longitude: 126.9780,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const handleStartPress = () => {
    navigation.navigate('Countdown');
  };

  return (
    <View style={styles.container}>
      <MapViewComponent 
        region={region} 
        onRegionChange={setRegion}
      />
      <MainUI onStartPress={handleStartPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
