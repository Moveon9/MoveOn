// PanelContent.js
import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function PanelContent({
  time,
  distance,
  heartRate,
  steps,
  count,
  isPaused,
  onPause,
  onResume,
  onStop,
}) {
  return (

    <View style={styles.container}>
        <View style={styles.handle} />

      {/* 상단 타이머 + 버튼 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>달린 시간 :</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.buttons}>
          {!isPaused && (
            <TouchableOpacity onPress={onPause} style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 30 }}> 
                <Image source={require('../../assets/image/main/ic_pause.png')} style={styles.iconImage} />
            </TouchableOpacity>
          )}

          {isPaused && (
            <TouchableOpacity onPress={onResume} style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 30 }}> 
                <Image source={require('../../assets/image/main/ic_play.png')} style={styles.iconImage} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onStop} style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 30 }}> 
                <Image source={require('../../assets/image/main/ic_stop.png')} style={[styles.iconImage, {tintColor:null}]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 하단 정보 */}
      <View style={styles.grid}>
        <View style={styles.column}>
            <Text style={styles.smallLabel}>거리</Text>
            <Text style={styles.value}>{distance}m</Text>
            <Text style={styles.smallLabel}>현재 칸의 수</Text>
            <Text style={styles.value}>{count}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.column}>
            <Text style={styles.smallLabel}>심박수</Text>
            <Text style={styles.value}>{heartRate}</Text>
            <Text style={styles.smallLabel}>걸음 수</Text>
            <Text style={styles.value}>{steps.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { paddingLeft: 20, paddingRight:20, paddingTop:10, paddingBottom:15 },
    handle: {
        width: 50,
        height: 5,
        backgroundColor: '#333',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 8, // 아래 내용과 간격
      },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: { fontSize: 14, color: '#333' },
    time: { fontSize: 32, fontWeight: 'bold', color: '#000' },
    buttons: {
        marginTop:5,
      flexDirection: 'row',
      gap: 12,
    },
    circle: {
      padding: 10,
      borderRadius: 20,
    },
    iconImage: {
      width: 40,
      height: 40,
      resizeMode: 'contain'
    },
    grid: {
      flexDirection: 'row',
      marginTop: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingVertical: 8,
    },
    column: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      width: 1,
      backgroundColor: '#aaa',
      marginVertical: 4,
    },
    value: {
      fontSize: 25,
      fontWeight: '600',
      color: '#000',
      marginBottom: 8,
    },
    smallLabel: {
      fontSize: 12,
      color: '#555',
    },
  });
  