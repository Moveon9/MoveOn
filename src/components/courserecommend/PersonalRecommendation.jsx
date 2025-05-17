import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';


export default function RecommendationCard() {
  return (
    <View style={styles.card}>
      <View contentContainerStyle={styles.contentContainer}>
        {/* 탭 버튼 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.tabSelected]}>
            <Text style={[styles.tabText, styles.tabTextSelected]}>맞춤 추천</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>이번주 추천</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.recommendationType}><Text style = {{fontWeight : 'bold' }}>무한이님</Text>을 위한 추천 코스</Text>
        <Text style={styles.courseTitle}>여의도 한강 공원</Text>

        {/* 지도 및 좌우 버튼 */}
        <View style={styles.mapRow}>
          <TouchableOpacity style={styles.arrowButton}>
            <Image
              source={require('../../assets/image/courserecommend/ic_BlackLeft.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/image/courserecommend/SampleCourse.png')}
            style={styles.mapImage}
          />
          <TouchableOpacity style={styles.arrowButton}>
            <Image
              source={require('../../assets/image/courserecommend/ic_BlackRight.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>

        {/* 지역 & 거리 정보 박스 */}
        <View style={styles.infoBox}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>소요시간</Text>
            <Text style={styles.infoValue}>2시간 50분</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>거리</Text>
            <Text style={styles.infoValue}>10km</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    padding: 15,
    top: 40,
  },
  contentContainer: {
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    overflow: 'hidden',
    height: 50,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabSelected: {
    backgroundColor: '#398342',
  },
  tabText: {
    color: '#818682',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recommendationType: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    marginLeft: 15,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  mapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  mapImage: {
    width: 250,
    height: 260,
    marginHorizontal: 10,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#39834219',
    padding: 16,
    marginTop: 20,
    borderRadius: 12,
    width: '95%',
    alignSelf: 'center',
  },
  infoColumn: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: '#535252',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 500,
    color: '#000',
  },
  separator: {
    width: 1,
    backgroundColor: '#d0d0d0',
    marginHorizontal: 16,
  },
});