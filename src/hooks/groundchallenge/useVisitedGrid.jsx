import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

const meterToLatDegree = (meter) => meter / 111000;
const meterToLngDegree = (meter, lat) => meter / (111000 * Math.cos(lat * Math.PI / 180));

export default function useVisitedGrid(meter = 10, isPaused = false) {
  const [polygonMap, setPolygonMap] = useState({});
  const gridSizeRef = useRef({ deltaLat: null, deltaLng: null });
  const watchId = useRef(null);

  useEffect(() => {
    if (isPaused) {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
      return;
    }

    watchId.current = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!gridSizeRef.current.deltaLat || !gridSizeRef.current.deltaLng) {
          gridSizeRef.current.deltaLat = meterToLatDegree(meter);
          gridSizeRef.current.deltaLng = meterToLngDegree(meter, latitude);
        }

        const { deltaLat, deltaLng } = gridSizeRef.current;

        const gridLat = Math.floor(latitude / deltaLat) * deltaLat;
        const gridLng = Math.floor(longitude / deltaLng) * deltaLng;
        const gridKey = `${gridLat.toFixed(6)},${gridLng.toFixed(6)}`;

        if (polygonMap[gridKey]) return;

        const polygon = [
          { latitude: gridLat, longitude: gridLng },
          { latitude: gridLat, longitude: gridLng + deltaLng },
          { latitude: gridLat + deltaLat, longitude: gridLng + deltaLng },
          { latitude: gridLat + deltaLat, longitude: gridLng },
        ];

        setPolygonMap((prev) => ({
          ...prev,
          [gridKey]: polygon,
        }));
      },
      (error) => {
        console.warn('Location error:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 3,
        interval: 1500,
        fastestInterval: 1000,
      }
    );

    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [isPaused, meter]);

  return polygonMap;
}
