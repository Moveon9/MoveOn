import React, { createContext, useContext, useState } from 'react';

// Context 생성
const PointContext = createContext();

// Provider 컴포넌트
export const PointProvider = ({ children }) => {
  const [point, setPoint] = useState(1000);

  return (
    <PointContext.Provider value={{ point, setPoint }}>
      {children}
    </PointContext.Provider>
  );
};

export default PointContext;
