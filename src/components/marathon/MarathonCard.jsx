import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MarathonCard({title, location, detailed_location, distance, date, image}) {
  return (
    <View style={styles.cardSection}>
      <View style={styles.cardRow}>
        <Image
          source={image}
          style={styles.image}
        />
        <View style={styles.infoSection}>
          <Text style={styles.location}>{detailed_location}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.distance}>{distance}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardSection: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  infoSection: {
    flex: 1,
    paddingLeft: 16,
  },
  location: {
    fontSize: 15,
    color: '#535252',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  distance: {
    fontSize: 15,
    color: '#535252',
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: '#535252',
    marginTop: 4,
  },
  divider: {
    height: 2,
    backgroundColor: '#F2F3F6',
    marginTop: 8,
  },
});
