// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Nav from './src/components/Nav';
import MarathonListPage from './src/pages/marathon/MarathonListPage';
import MarathonInfoPage from './src/pages/marathon/MarathonInfoPage';
import MarathonCoursePage from './src/pages/marathon/MarathonCoursePage'
import CountdownScreen_marathon from './src/pages/marathon/CountdownScreen_marathon';
import MarathonTabs from './src/components/marathon/MarathonTabs';
import CountdownScreen from './src/pages/countdown/CountdownScreen';
import RunningPage from './src/pages/RunningPage';

import LoginPage from './src/pages/login/LoginPage'; 
import UserInfoPage1 from './src/pages/login/UserInfo1';
import UserInfoPage2 from './src/pages/login/UserInfo2';

import MainUI from './src/components/main/MainUI';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          {/* initialRouteName='Login' */}
          <Stack.Navigator 
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
            }}
          >
            {/* <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen name="UserInfo1" component={UserInfoPage1} />

            <Stack.Screen name="UserInfo2" component={UserInfoPage2} /> */}

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
              name="MarathonCoursePage"
              component={MarathonCoursePage}
            />
            <Stack.Screen
              name="Countdown_marathon"
              component={CountdownScreen_marathon}
              options={{
                gestureEnabled: false,
                presentation: 'fullScreenModal',
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

            <Stack.Screen name="MainUI" 
              component={MainUI} />


          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}
