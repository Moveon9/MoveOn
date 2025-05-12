// src/App.js
import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Nav from './src/components/Nav';
import MarathonListPage from './src/pages/marathon/MarathonListPage';
import MarathonInfoPage from './src/pages/marathon/MarathonInfoPage';
import CountdownScreen from './src/pages/countdown/CountdownScreen';
import RunningPage from './src/pages/RunningPage';
import RunningRecordSavePage from './src/pages/RunningRecordSavePage';

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={Nav}
            options={{
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="MarathonBoard"
            component={MarathonListPage}
            options={{
              presentation: 'card'
            }}
          />

          <Stack.Screen
            name="MarathonInfoPage"
            component={MarathonInfoPage}
            options={{
              presentation: 'card'
            }}
          />

          <Stack.Screen
            name="Countdown"
            component={CountdownScreen}
            options={{
              gestureEnabled: false,
              presentation: 'fullScreenModal',
            }}
          />

          <Stack.Screen
            name="RunningPage"
            component={RunningPage}
            options={{
              gestureEnabled: false,
              animation: 'none',
            }}
          />

          <Stack.Screen
            name="RunningRecordSave"
            component={RunningRecordSavePage}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom'
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
