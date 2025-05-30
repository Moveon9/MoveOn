import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import VisitedAreaOverlay from './VisitedAreaOverlay';

export default function VisitedRegionMap({ region, visitedAreas }) {
  return (
    <MapView
      style={styles.map}
      region={region}
      showsUserLocation = {true}
      followsUserLocation
    >
      <VisitedAreaOverlay visitedAreas={visitedAreas} />
    </MapView>
    
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
