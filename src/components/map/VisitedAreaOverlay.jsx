import React from 'react';
import { Polygon } from 'react-native-maps';

export default function VisitedAreaOverlay({ visitedAreas }) {
  return (
    <>
      {visitedAreas.map((square, idx) => (
        <Polygon
          key={idx}
          coordinates={square}
          fillColor="rgba(0, 122, 255, 0.3)"
          strokeColor="rgba(0, 100, 0, 0.8)"
          strokeWidth={1}
        />
      ))}
    </>
  );
}
