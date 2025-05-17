import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default function MarathonInfoPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flex:1}}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../../assets/image/marathon/MarathonSampleImg.png')}
            style={styles.headerImage}
          />

          {/* 카드 박스 */}
          <View style={styles.cardSection}>
            <Text style={styles.title}>여의도 한강 공원</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoBox}>
                <Text style={styles.label}>지역</Text>
                <Text style={styles.value}>서울</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.label}>거리</Text>
                <Text style={styles.value}>10km</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.label}>1등 보상</Text>
                <Text style={styles.value}>500p</Text>
              </View>
            </View>
          </View>

          {/* 상세 정보 */}
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Image source={require('../../assets/image/marathon/ic_location.png')} style={styles.icon} />
              <Text style={styles.detailLabel}>출발 위치</Text>
              <Text style={styles.detailText}>서울특별시 영등포구 여의동로 330</Text>
            </View>

            <View style={styles.spacer} />

            <View style={styles.detailRow}>
              <Image source={require('../../assets/image/marathon/ic_date.png')} style={styles.icon} />
              <Text style={styles.detailLabel}>기간</Text>
              <Text style={styles.detailText}>2025. 01. 26 ~ 2025. 02. 01</Text>
            </View>

            <View style={styles.spacer} />

            <View style={styles.detailRow}>
              <Image source={require('../../assets/image/marathon/ic_count.png')} style={styles.icon} />
              <Text style={styles.detailLabel}>횟수</Text>
              <Text style={styles.detailText}>제한 없음</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Image source={require('../../assets/image/marathon/ic_content.png')} style={styles.icon} />
              <Text style={styles.detailText}>
                이 마라톤은 누구나 참여할 수 있으며, 정해진 코스를 따라야 기록이 인정됩니다.
              </Text>
            </View>

            <View style={styles.spacer} />

            <View style={styles.detailRow}>
              <Image source={require('../../assets/image/marathon/ic_content.png')} style={styles.icon} />
              <Text style={styles.detailText}>
                정해진 출발 시간 없이, 기간 내 언제든지 원하는 시간에 완주하면 인정됩니다.
              </Text>
            </View>

            <View style={styles.spacer} />

            <View style={styles.detailRow}>
              <Image source={require('../../assets/image/marathon/ic_cource.png')} style={styles.icon} />
              <Text style={styles.detailLabel}>코스</Text>
            </View>

            <View style={styles.courseImageWrapper}>
              <Image
                source={require('../../assets/image/marathon/MarathonSampleImg.png')}
                style={styles.courseImage}
              />
            </View>

            {/* spacer for button */}
            <View style={{ height: 80 }} />
          </View>
        </ScrollView>

        {/* 하단 고정 버튼 */}
        <TouchableOpacity style={styles.challengeButton}>
          <Text style={styles.challengeButtonText}>지금 도전!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardSection: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: -70,
    padding: 16,
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    padding: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  infoBox: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#535252',
    paddingBottom: 8,
  },
  value: {
    fontSize: 25,
    color: '#000',
    paddingBottom: 8,
  },
  detailSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    marginTop: 3,
    resizeMode: 'contain',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#818682',
    marginRight: 8,
    minWidth: 60,
  },
  detailText: {
    fontSize: 14,
    color: '#000',
    flexShrink: 1,
    lineHeight: 20,
  },
  divider: {
    height: 2,
    backgroundColor: '#F2F3F6',
    marginVertical: 20,
  },
  spacer: {
    height: 16,
  },
  challengeButton: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
    backgroundColor: '#398342',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    height: 65,
  },
  challengeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  courseImageWrapper: {
    marginTop: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 257,
    resizeMode: 'cover',
  },
});
