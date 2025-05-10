import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function MapViewComponent({ region, onRegionChange }) {
  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      showsUserLocation={true}
      region={region}
      onRegionChangeComplete={onRegionChange}
    />
  );
}