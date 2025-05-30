// src/components/marathon/MarathonMap.jsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';

export default function MarathonMap({ start, end, denseCourse, remainingCoords, passedCoords }) {
  return (
    <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        googleMapId='99c07a8894d0db7366aa3689'
        initialRegion={{
            latitude: start.latitude,
            longitude: start.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
    >
      <Polyline coordinates={denseCourse} strokeColor="white" strokeWidth={7} />
      {passedCoords.length > 0 && (
        <Polyline coordinates={passedCoords} strokeColor="red" strokeWidth={5} />
      )}
      {remainingCoords.length > 0 && (
        <Polyline coordinates={remainingCoords} strokeColor="#398342" strokeWidth={5} />

      )}

      <Marker coordinate={start} title="출발">
        <Image source={require('../../../assets/image/marathon/ic_start.png')} style={styles.markerImage} />
      </Marker>
      <Marker coordinate={end} title="도착">
        <Image source={require('../../../assets/image/marathon/ic_destination.png')} style={styles.markerImage} />
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  markerImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
