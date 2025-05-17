import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

const meterToLatDegree = (meter) => meter / 111000;
// 경도 delta는 초기 위치에서 한번만 계산
const meterToLngDegree = (meter, lat) => meter / (111000 * Math.cos(lat * Math.PI / 180));

export default function useVisitedGrid(meter = 50) {
  const [polygonMap, setPolygonMap] = useState({});
  const gridSizeRef = useRef({ deltaLat: null, deltaLng: null });
  const watchId = useRef(null);

  useEffect(() => {
    watchId.current = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // 최초 위치에서 delta 계산 (한 번만)
        if (!gridSizeRef.current.deltaLat || !gridSizeRef.current.deltaLng) {
          gridSizeRef.current.deltaLat = meterToLatDegree(meter);
          gridSizeRef.current.deltaLng = meterToLngDegree(meter, latitude);
        }

        const { deltaLat, deltaLng } = gridSizeRef.current;

        // 정렬된 격자 위치 구하기
        const gridLat = Math.floor(latitude / deltaLat) * deltaLat;
        const gridLng = Math.floor(longitude / deltaLng) * deltaLng;
        const gridKey = `${gridLat.toFixed(5)},${gridLng.toFixed(5)}`;

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
        distanceFilter: 5,
        interval: 2000,
        fastestInterval: 1000,
      }
    );

    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [meter]);

  return polygonMap;
}
