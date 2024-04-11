import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const locations = [
  {
    title: 'New York',
    places: ['1. Central Park', 'Times Square', 'Empire State Building', 'Statue of Liberty'],
    details: '1.Location details.'
  },
  {
    title: 'California',
    places: ['Places in cali'],
    details: 'Location detail.'
  }
];

const HomeScreen = ({ navigation }) => {
  const navigateToInfo = (location) => {
    navigation.navigate('Location Information', { location });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>
      {locations.map(location => (
        <View key={location.title} style={styles.locationItem}>
          <Text>{location.title}</Text>
          <Button title="View Details" onPress={() => navigateToInfo(location)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#ff8c00',
  },
  title: {
    marginTop: 20,
    fontSize: 40,
    color: 'black',
    paddingHorizontal: 15,
    borderWidth: 4,
    borderColor: '#20232a',
    backgroundColor: '#deb887',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationItem: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
