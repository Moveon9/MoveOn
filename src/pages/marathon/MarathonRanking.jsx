import React from 'react';
import { StyleSheet, ScrollView, Text, SafeAreaView, View } from 'react-native';
import MyRankingCard from '../../components/marathon/MyRankingCard';
import RankingList from '../../components/marathon/RankingList';
import DateSelector from '../../components/ranking/DateSelector';

const MarathonRankingPage = () => {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.safeareaview}>
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>마라톤 랭킹</Text>
            </View>
            <View style={styles.container}>
                <DateSelector onChange={(weeks) => console.log("선택된 주간:", weeks)} />
            </View>
            <MyRankingCard rank={4} name="Me" time={{hour: 1, minute: 25, second: 22}} />
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

export default MarathonRankingPage;
