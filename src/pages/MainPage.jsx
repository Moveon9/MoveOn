import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function MainPage() {
  const [region, setRegion] = useState({
    latitude: 37.5665,  // Default to Seoul coordinates
    longitude: 126.9780,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    // Request location permission and get current position
    Geolocation.requestAuthorization(
      () => {
        Geolocation.getCurrentPosition(
          (position) => {
            setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          },
          (error) => {
            Alert.alert('Error', '위치 정보를 가져오는데 실패했습니다.');
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      },
      (error) => {
        Alert.alert('Error', '위치 권한이 필요합니다.');
        console.log(error);
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="현재 위치"
          description="You are here"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
