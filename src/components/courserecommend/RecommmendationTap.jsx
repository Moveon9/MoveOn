// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import PersonalRecommendation from './PersonalRecommendation';
// import WeeklyRecommendation from './WeeklyRecommendation';

// export default function RecommendationCard() {
//   const [selectedTab, setSelectedTab] = useState('personal');

//   return (
//     <View style={styles.card}>
//       <View contentContainerStyle={styles.contentContainer}>
//         {/* 탭 버튼 */}
//         <View style={styles.tabContainer}>
//           <TouchableOpacity
//             style={[styles.tab, selectedTab === 'personal' && styles.tabSelected]}
//             onPress={() => setSelectedTab('personal')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'personal' && styles.tabTextSelected]}>
//               맞춤 추천
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tab, selectedTab === 'weekly' && styles.tabSelected]}
//             onPress={() => setSelectedTab('weekly')}
//           >
//             <Text style={[styles.tabText, selectedTab === 'weekly' && styles.tabTextSelected]}>
//               이번주 추천
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* 탭에 따라 다른 컴포넌트 렌더 */}
//         {selectedTab === 'personal' ? <PersonalRecommendation /> : <WeeklyRecommendation />}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: 'white',
//     margin: 16,
//     borderRadius: 16,
//     elevation: 4,
//     padding: 15,
//     top: 40,
//   },
//   contentContainer: {
//     padding: 16,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 16,
//     overflow: 'hidden',
//     height: 50,
//     marginBottom: 20,
//     width: '95%',
//     alignSelf: 'center',
//   },
//   tab: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabSelected: {
//     backgroundColor: '#398342',
//   },
//   tabText: {
//     color: '#818682',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   tabTextSelected: {
//     color: '#fff',
//   },
// });
