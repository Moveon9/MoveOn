import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ SafeAreaView import
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MarathonInfoPage from '../../pages/marathon/MarathonInfoPage';
import MarathonRankingPage from '../../pages/marathon/MarathonRanking';

const Tab = createMaterialTopTabNavigator();

export default function MarathonTabs() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}> {/* ✅ SafeArea 적용 */}
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
            tabBarActiveTintColor: '#398342',
            tabBarInactiveTintColor: '#999',
            tabBarIndicatorStyle: { backgroundColor: '#398342', height: 2 },
          }}
        >
          <Tab.Screen name="챌린지" component={MarathonInfoPage} />
          <Tab.Screen name="마라톤 랭킹" component={MarathonRankingPage} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
});
