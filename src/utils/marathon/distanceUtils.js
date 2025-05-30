// src/utils/distanceUtils.js
import haversine from 'haversine-distance';

export const toXY = (coord) => {
  const R = 6371000;
  const latRad = (coord.latitude * Math.PI) / 180;
  const lonRad = (coord.longitude * Math.PI) / 180;
  return {
    x: R * Math.cos(latRad) * lonRad,
    y: R * latRad,
  };
};

export const distanceToSegment = (P, A, B) => {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  if (dx === 0 && dy === 0) return Math.hypot(P.x - A.x, P.y - A.y);

  const t = Math.max(0, Math.min(1, ((P.x - A.x) * dx + (P.y - A.y) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(P.x - (A.x + t * dx), P.y - (A.y + t * dy));
};

export const isOffCoursePrecise = (loc, path, threshold = 10) => {
  const P = toXY(loc);
  return !path.some((_, i) => {
    if (i === path.length - 1) return false;
    const A = toXY(path[i]);
    const B = toXY(path[i + 1]);
    return distanceToSegment(P, A, B) < threshold;
  });
};

export const isNearStart = (loc, start, threshold = 5) => {
  const distance = haversine(loc, start);
  console.log('📏 거리: ', distance);
  return distance <= threshold;
};
