import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LocationInformation = ({ route }) => {
  const { location } = route.params;
  const navigation = useNavigation();

  const [hearts, setHearts] = React.useState([]);

  const addHeart = (place) => {
    setHearts((prevHearts) => [...prevHearts, place]);
  };

  const heartPlace = (place) => {
    if (hearts.length < 3) {
      addHeart(place);
      navigation.navigate('StoredItineraryScreen', { hearts: [...hearts, place] });
    } else {
      Alert.alert('Max hearts reached', 'You can only heart 3 places.');
    }


  };

  const isHearted = (place) => {
    return place && hearts.some((heartedPlace) => heartedPlace.name === place.name);
  };  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        </TouchableOpacity>
        <Text style={styles.title}>{location.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StoredItineraryScreen', { hearts })}>
          <Ionicons name="heart-outline" size={24} color="red" style={styles.heartButton} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {location.places.map((place, index) => (
          <View key={index} style={styles.placeContainer}>
            <Image source={{ uri: place.image }} style={styles.placeImage} />
            <View style={styles.placeDetails}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeDescription}>{place.description}</Text>
            </View>
            <TouchableOpacity onPress={() => heartPlace(place)}>
            <Ionicons
  name={isHearted(place) ? 'heart' : 'heart-outline'}
  size={24}
  marginTop={-65}
  color={isHearted(place) ? 'red' : 'white'}
/>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffa468',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#ddd',
  },
  title: {
    marginTop:100,
    fontSize: 40,
    fontWeight: 'bold',
  },
  heartButton: {
    marginTop: 100,
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  placeImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  placeDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default LocationInformation;