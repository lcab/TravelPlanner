import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";


const LocationInformation = ({ route }) => {

  const { location } = route.params;
  const navigation = useNavigation();

  const [hearts, setHearts] = React.useState([]);

  useEffect(() => {
    try {
      const db = getDatabase();
      const heartedPlacesRef = ref(db, 'locations');

      onValue(heartedPlacesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const heartedPlaces = Object.values(data);
          setHearts(heartedPlaces);
        } else {
          setHearts([]);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const toggleHeart = (place) => {
    try {
      if (isHearted(place)) {
        removeHeart(place);
      } else {
        addHeart(place);
      }
    } catch (error) {
      console.error("Error toggling heart:", error);
    }
  };


  const addHeart = (place) => {
    try {
      if (hearts.length < 3) {
        setHearts((prevHearts) => [...prevHearts, place]);
        const db = getDatabase();
        const heartedPlacesLocation = ref(db, `locations/${place.name.replace(/\s+/g, '')}`);

        set(heartedPlacesLocation, {
          description: place.description,
          image: place.image,
          name: place.name,
          isHearted: true
        });
      } else {
        Alert.alert('Max hearts reached', 'You can only heart 3 places.');
      }
    } catch (error) {
      console.error("Error adding heart:", error);
    }
  };

  const removeHeart = (place) => {
    const placeRef = hearts.find((heartedPlace) => heartedPlace.name === place.name);
    if (placeRef && placeRef.name) {
      const db = getDatabase();
      const heartedPlacesRef = ref(db, `locations/${placeRef.name.replace(/\s+/g, '')}`);
      remove(heartedPlacesRef)
        .then(() => {
          setHearts(hearts.filter((heartedPlace) => heartedPlace.name !== placeRef.name));
        })
        .catch((error) => {
          console.error("Error removing heart: ", error);
        });
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
            <TouchableOpacity onPress={() => toggleHeart(place)}>
              <Ionicons
                name={isHearted(place) ? 'heart' : 'heart-outline'}
                size={24}
                marginTop={-65}
                color={isHearted(place) ? 'red' : 'orange'}
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
    backgroundColor: "lightyellow",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  title: {
    marginTop: 100,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#f46200'
  },
  placeDescription: {
    fontSize: 14,
    color: 'black',
  },
});

export default LocationInformation;
