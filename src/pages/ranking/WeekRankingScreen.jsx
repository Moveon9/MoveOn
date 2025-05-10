import React from 'react';
import { StyleSheet, ScrollView, Text, SafeAreaView, View } from 'react-native';
import MyRankingCard from '../../components/ranking/MyRankingCard';
import RankingList from '../../components/ranking/RankingList';
import DateSelector from '../../components/ranking/DateSelector';

const RankingScreen = () => {
  return (
    <SafeAreaView style={styles.safeareaview}>
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>주간 랭킹</Text>
            </View>
            <View style={styles.container}>
                <DateSelector onChange={(weeks) => console.log("선택된 주간:", weeks)} />
            </View>
            <MyRankingCard rank={4} name="Me" count={50} />
            <RankingList />
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  text: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    color: "#000",
    textAlign: "center"
    },
safeareaview: {
    flex: 1,
    height: 776,
    width: "100%",
    backgroundColor: "#fff"
    },   
});

export default RankingScreen;
