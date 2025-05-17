// src/App.js
import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Nav from './src/components/Nav';
import MarathonListPage from './src/pages/marathon/MarathonListPage';
import MarathonInfoPage from './src/pages/marathon/MarathonInfoPage';
import MarathonTabs from './src/components/marathon/MarathonTabs';
import CountdownScreen from './src/pages/countdown/CountdownScreen';
import RunningPage from './src/pages/RunningPage';
import MainUI from './src/components/main/MainUI';
import { PointProvider } from './src/context/PointContext';


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <PointProvider>
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
            />

            <Stack.Screen
              name="MarathonTabs"
              component={MarathonTabs}
              options={{ headerShown: false }}
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

            <Stack.Screen name="MainUI" 
            component={MainUI} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PointProvider>
  );
}
