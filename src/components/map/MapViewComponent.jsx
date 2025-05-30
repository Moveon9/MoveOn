import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapViewComponent({ region, onRegionChange }) {
  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      provider={PROVIDER_GOOGLE}
      googleMapId='99c07a8894d0db7366aa3689'
      showsUserLocation={true}
      region={region}
      onRegionChangeComplete={onRegionChange}
    />
  );
}