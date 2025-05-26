// src/context/UserContext.js
import React, { createContext, useContext, useState } from 'react';

// 컨텍스트 생성
const UserContext = createContext();

// 프로바이더 컴포넌트
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [nickname, setNickname] = useState('');

  return (
    <UserContext.Provider value={{ userId, setUserId, nickname, setNickname }}>
      {children}
    </UserContext.Provider>
  );
};

// 커스텀 훅
export const useUser = () => useContext(UserContext);
