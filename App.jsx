// src/App.js
import React, { useState } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Nav from './src/components/Nav';
import MarathonListPage from './src/pages/marathon/MarathonListPage';
import MarathonInfoPage from './src/pages/marathon/MarathonInfoPage';
import MarathonCoursePage from './src/pages/marathon/MarathonCoursePage'
import CountdownScreen_marathon from './src/pages/marathon/CountdownScreen_marathon';
import MarathonTabs from './src/components/marathon/MarathonTabs';
import CountdownScreen from './src/pages/countdown/CountdownScreen';
import RunningPage from './src/pages/running/RunningPage';
import MainUI from './src/components/main/MainUI';
import { PointProvider } from './src/context/PointContext';
import GameInvitationPage from './src/pages/groundchallenge/GameInvitationPage';
import Join from './src/pages/login/Join'
import UserInfo1 from './src/pages/login/UserInfo1';
import UserInfo2 from './src/pages/login/UserInfo2';
import LoginPage from './src/pages/login/LoginPage'
import UserInfoComplete from './src/pages/login/UserInfoComplete';
import RecordPage from './src/pages/running/RecordPage'
import ActivityRecord from './src/pages/mypage/ActivityRecord';
import { UserProvider } from './src/context/UserContext';


const Stack = createNativeStackNavigator();
export default function App() {
const [showGameModal, setShowGameModal] = useState(true);
const [showInviteScreen, setShowInviteScreen] = useState(false);

  return (
    <UserProvider>
      <PointProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName='MainTabs'
              screenOptions={{
                headerShown: false,
                gestureEnabled: true
              }}
            >
              <Stack.Screen
                name="Join"
                component={Join}
              />

              <Stack.Screen 
              name="LoginPage" 
              component={LoginPage} />

              <Stack.Screen 
              name="UserInfo1" 
              component={UserInfo1} />

              <Stack.Screen 
              name="UserInfo2" 
              component={UserInfo2} />

              <Stack.Screen
                name="UserInfoComplete"
                component={UserInfoComplete} />

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
                name="MarathonCoursePage"
                component={MarathonCoursePage}
              />
              <Stack.Screen
                name="MarathonListPage"
                component={MarathonListPage}
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
              <Stack.Screen
                name="RecordPage"
                component={RecordPage}
              />

              <Stack.Screen name="MainUI" 
              component={MainUI} />

              <Stack.Screen
                name="GameInvitationPage"
                component={GameInvitationPage}
              />

              <Stack.Screen
                name="ActivityRecord"
                component={ActivityRecord}
                options={{
                  gestureEnabled: true,
                }}
                />



            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PointProvider>
    </UserProvider>
  );
}
