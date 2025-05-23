import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MarathonCard from '../../components/marathon/MarathonCard';
import { MarathonList } from '../../components/marathon/course/MarathonList';

export default function MarathonPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>미니 마라톤</Text>
        {MarathonList.map((item) => (
          <TouchableOpacity onPress={() => navigation.navigate('MarathonTabs', {marathon: item})}>
            <MarathonCard 
              title={item.title}
              location={item.location}
              detailed_location={item.detailed_location}
              distance={item.distance}
              date={item.date}
              image={item.image}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
});
