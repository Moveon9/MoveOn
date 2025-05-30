// src/navigation/Nav.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// SVG 아이콘
import HomeIcon from '../assets/image/nav/ic_RunningNavButton.svg';
import ChallengeIcon from '../assets/image/nav/ic_ChallengeNavButton.svg';
import RankingIcon from '../assets/image/nav/ic_RankingNavButton.svg';
import ProfileIcon from '../assets/image/nav/ic_MyNavButton.svg';

// 스크린 컴포넌트
import MainPage from '../pages/MainPage';
import ChallengePage from '../pages/ChallengePage';
import RankingPage from '../pages/RankingPage';
import MyPage from '../pages/mypage/MyPage';

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const color = focused ? '#398342' : 'gray';
          const size = 24;

          switch (route.name) {
            case 'Running':
              return <HomeIcon width={size} height={size} color={color} />;
            case 'Challenge':
              return <ChallengeIcon width={size} height={size} color={color} />;
            case 'Ranking':
              return <RankingIcon width={size} height={size} color={color} />;
            case 'MyPage':
              return <ProfileIcon width={size} height={size} color={color} />;
            default:
              return null;
          }
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: '#398342',
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Running"
    >
      <Tab.Screen 
        name="Running" 
        component={MainPage}
        options={{ 
          title: '러닝',
          unmountOnBlur: false // 화면이 보이지 않을 때도 컴포넌트 유지
        }}
      />
      <Tab.Screen name="Challenge" component={ChallengePage} options={{ title: '챌린지' }} />
      <Tab.Screen name="Ranking" component={RankingPage} options={{ title: '랭킹' }} />
      <Tab.Screen name="MyPage" component={MyPage} options={{ title: '마이페이지' }} />
    </Tab.Navigator>
  );
}
