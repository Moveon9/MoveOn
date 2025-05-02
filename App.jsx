// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // 추가

import Nav from './src/components/Nav'; // 경로 오타 수정

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Nav />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
