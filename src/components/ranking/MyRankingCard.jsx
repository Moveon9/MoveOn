import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Profile from "../../assets/image/ranking/ic_default_profile.png";

const MyRankingCard = ({rank, name, count}) => {
    return (
        <SafeAreaView edges={['left', 'right']}style={styles.container}>
            <View style={styles.section}>
              <Text style={[styles.label]}>나의 순위</Text>
                <Text style={[styles.value]}>{rank}</Text>
            </View>
            <View style={styles.centerSection}>
                <View style={[styles.avatarCircle]}>
                    <Image source={Profile} style={styles.avatarImage} />
                </View>
                <Text style={[styles.centerLabel]}>Me</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>땅의 갯수</Text>
                <Text style={styles.value}>
                    <Text style={styles.countNumber}>{count}</Text>
                    <Text style={styles.countUnit}>칸</Text>
                </Text>
            </View>
        </SafeAreaView>);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,      // 좌우 간격 통일
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#398342',
        marginBottom: 12,
      },
      section: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      label: {
        fontSize: 13,
        fontFamily: 'Inter-Medium',
        color: '#398342',
        marginBottom: 4,
      },
    
      value: {
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
        color: '#398342',
      },
    
      centerSection: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      avatarCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#eaf2ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
      },
    
      avatarImage: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
      },
    
      centerLabel: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#000',
      },
    
      countNumber: {
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
        color: '#398342',
      },
    
      countUnit: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.5)',
      },
    });

export default MyRankingCard;
