import React from 'react';
import { useNavigation } from '@react-navigation/native';


import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const MyPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          {/* Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.pageTitle}>마이페이지</Text>
          </View>

          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={require('../assets/image/mypage/DefaultProfile.png')}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <View style={styles.usernameRow}>
                <Text style={styles.username}>Me</Text>
                <Image
                  source={require('../assets/image/mypage/ic_RightButton.png')}
                  style={styles.arrowIcon}
                />
              </View>
              <View style={styles.pointRow}>
                <Image
                  source={require('../assets/image/mypage/ic_Point.png')}
                  style={styles.pointIcon}
                />
                <Text style={styles.pointText}>300</Text>
              </View>
            </View>
          </View>

          {/* Activity Section */}
          <View style={styles.activityRow}>
            <TouchableOpacity 
              style={styles.activityItem}
              onPress={() => navigation.navigate('ActivityRecord')}
            >
              <Image
                source={require('../assets/image/mypage/ic_ActivityRecord.png')}
                style={styles.activityIcon}
              />
              <Text style={styles.activityLabel}>활동 기록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <Image
                source={require('../assets/image/mypage/ic_Achievement.png')}
                style={styles.activityIcon}
              />
              <Text style={styles.activityLabel}>업적</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <Image
                source={require('../assets/image/mypage/ic_Store.png')}
                style={styles.activityIcon}
              />
              <Text style={styles.activityLabel}>상점</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Weekly Record Section */}
          <View style={styles.recordBox}>
            <Text style={styles.recordLabel}>이번주 누적 칸</Text>
            <Text style={styles.recordValue}>50</Text>
          </View>

          {/* Today Record Section */}
          <View style={styles.recordBox}>
            <Text style={styles.recordTitle}>오늘 기록</Text>
            <View style={styles.todayRow}>
              <View style={styles.recordColumn}>
                <Text style={styles.recordValue}>50</Text>
                <Text style={styles.subLabel}>오늘 채운 칸</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.recordColumn}>
                <Text style={styles.recordValue}>10,300</Text>
                <Text style={styles.subLabel}>걸음 수</Text>
              </View>
            </View>
          </View>

          {/* Menu Section */}
          {['자주 묻는 질문', '로그아웃'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuText}>{item}</Text>
              <Image
                source={require('../assets/image/mypage/ic_SmallRightButton.png')}
                style={styles.menuArrow}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 16,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    marginRight: 16,
    borderRadius: 35,
  },
  userInfo: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  arrowIcon: {
    width: 10,
    height: 20,
    marginLeft: 24,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pointIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  pointText: {
    fontSize: 12,
    color: '#000',
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  activityItem: {
    flex: 1,
    alignItems: 'center',
  },
  activityIcon: {
    width: 28,
    height: 28,
  },
  activityLabel: {
    marginTop: 8,
    fontSize: 15,
    color: '#000',
  },
  divider: {
    height: 2,
    backgroundColor: '#F2F3F6',
    marginVertical: 16,
  },
  recordBox: {
    backgroundColor: '#f1f7f1',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },
  recordLabel: {
    fontSize: 15,
    color: '#000',
    marginBottom: 8,
  },
  recordValue: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  recordTitle: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  todayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recordColumn: {
    flex: 1,
  },
  subLabel: {
    fontSize: 12,
    color: '#818682',
    marginTop: 4,
  },
  separator: {
    width: 1,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 8,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  menuText: {
    fontSize: 15,
    color: '#1F2024',
  },
  menuArrow: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});
