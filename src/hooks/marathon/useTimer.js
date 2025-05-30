// src/hooks/useTimer.js
import { useEffect, useRef, useState } from 'react';

export default function useTimer(isActive) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clear();
    }

    return () => clear();
  }, [isActive]);

  const clear = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = () => {
    const h = String(Math.floor(elapsedTime / 3600)).padStart(2, '0');
    const m = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0');
    const s = String(elapsedTime % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return { elapsedTime, formatTime };
}
