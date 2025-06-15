import { useState, useRef, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

export default function UseDistance(isPaused = false) {
  const [distance, setDistance] = useState(0);
  const [lastPosition, setLastPosition] = useState(null);
  const [speed, setSpeed] = useState(0); // 속도 추가
  const watchIdRef = useRef(null);

  // 두 지점 간의 거리 계산 (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // 지구 반지름 (미터)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // 거리 포맷팅
  const formatDistance = (meters) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    } else {
      return `${(meters / 1000).toFixed(2)}km`;
    }
  };

  // 위치 추적 시작/중지
  useEffect(() => {
    if (!isPaused) {
      // 위치 추적 시작
      watchIdRef.current = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy, speed: gpsSpeed } = position.coords;
          const currentPosition = { latitude, longitude };
          
          // GPS 속도 업데이트 (m/s)
          setSpeed(gpsSpeed || 0);

          if (lastPosition) {
            const distanceIncrement = calculateDistance(
              lastPosition.latitude,
              lastPosition.longitude,
              currentPosition.latitude,
              currentPosition.longitude
            );

            // 개선된 필터링 조건
            const shouldAddDistance = 
              // 1. 기본 거리 조건: 1m 이상 30m 이하
              distanceIncrement >= 1 && distanceIncrement <= 30 &&
              // 2. GPS 정확도 조건: 50m 이하 (완화)
              accuracy <= 50 &&
              // 3. 속도 조건: GPS 속도가 0.5m/s (1.8km/h) 이상이거나 거리가 3m 이상
              (gpsSpeed >= 0.5 || distanceIncrement >= 3);

            if (shouldAddDistance) {
              setDistance(prev => prev + distanceIncrement);
              console.log(`거리 증가: +${distanceIncrement.toFixed(1)}m, 속도: ${(gpsSpeed * 3.6).toFixed(1)}km/h, 정확도: ${accuracy.toFixed(1)}m`);
            } else {
              console.log(`이동 무시: 거리=${distanceIncrement.toFixed(1)}m, 속도=${(gpsSpeed * 3.6).toFixed(1)}km/h, 정확도=${accuracy.toFixed(1)}m`);
            }
          }

          setLastPosition(currentPosition);
        },
        (error) => {
          console.warn('거리 추적 오류:', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 1, // 1m로 다시 낮춤
          interval: 1000,    // 1초로 다시 조정
          fastestInterval: 500,
          maximumAge: 500,
          timeout: 15000,
        }
      );
    } else {
      // 위치 추적 중지
      if (watchIdRef.current) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }

    // 클린업
    return () => {
      if (watchIdRef.current) {
        Geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isPaused, lastPosition]);

  // 거리 초기화 함수
  const resetDistance = () => {
    setDistance(0);
    setLastPosition(null);
    setSpeed(0);
  };

  return {
    distance,                    // 미터 단위 거리
    formattedDistance: formatDistance(distance), // 포맷된 거리 문자열
    speed: speed * 3.6,         // km/h 단위 속도
    resetDistance,              // 거리 초기화 함수
  };
}
