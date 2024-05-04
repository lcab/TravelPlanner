import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import CalendarScreen from './CalendarScreen';

const HomeStack = createStackNavigator();

const CustomHeader = ({ navigation }) => {
  const navigateToCalendar = () => {
    navigation.navigate('Calendar');
  };

  const navigateToStoredItinerary = () => {
    navigation.navigate('StoredItinerary');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, top: 50, paddingBottom: 70 }}>
      <TouchableOpacity onPress={navigateToCalendar}>
        <FontAwesome name="calendar" size={24} color="orange" style={{ marginRight: 16 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToStoredItinerary}>
        <FontAwesome name="heart" size={24} color="orange" />
      </TouchableOpacity>
    </View>
  );
}

const StoredItineraryScreen = ({ navigation, route }) => {

  const [selectedStartDate, setSelectedStartDate] = useState({});
  const [selectedEndDate, setSelectedEndDate] = useState({});
  const [heartedPlaces, setHeartedPlaces] = useState([]);
  const [openCalendarPlace, setOpenCalendarPlace] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const heartedPlacesGet = ref(db, 'locations');

    const unsubscribe = onValue(heartedPlacesGet, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const heartedPlacesArray = Object.values(data);
        setHeartedPlaces(heartedPlacesArray);
      } else {
        setHeartedPlaces([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleStartDateSelect = (placeName, date) => {
    setSelectedStartDate(prevSelectedStartDate => ({
      ...prevSelectedStartDate,
      [placeName]: date,
    }));
    setOpenCalendarPlace(null); // Close the calendar after selecting date
  };

  const handleEndDateSelect = (placeName, date) => {
    setSelectedEndDate(prevSelectedEndDate => ({
      ...prevSelectedEndDate,
      [placeName]: date,
    }));
    setOpenCalendarPlace(null); // Close the calendar after selecting date
  };

  const navigateToItinerary = () => {
    navigation.navigate('ItineraryScreen');
  };

  if (heartedPlaces.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No hearted places found.</Text>
      </View>
    );
  }

  const removeHeart = (place) => {
    const placeRef = heartedPlaces.find((heartedPlace) => heartedPlace.name === place.name);
    if (placeRef && placeRef.id) {
      const db = getDatabase();
      const heartedPlacesRef = ref(db, 'locations/' + placeRef.id);
      remove(heartedPlacesRef)
        .then(() => {
          setHeartedPlaces(heartedPlaces.filter((heartedPlace) => heartedPlace.id !== placeRef.id));
        })
        .catch((error) => {
          console.error("Error removing heart: ", error);
        });
    }
  };

  const isHearted = (place) => {
    return place && heartedPlaces.some((heartedPlace) => heartedPlace.name === place.name);
  };

  const toggleHeart = (place) => {
    if (isHearted(place)) {
      removeHeart(place);
    } else {
      Alert.alert('Alert', 'You can only remove a heart from a place you have previously liked.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Stored Itinerary</Text>
        <Text style={styles.subtitle}>Hearted Places:</Text>
        <View style={styles.placesContainer}>
          {heartedPlaces.map((place, index) => (
            <View key={index} style={styles.placeContainer}>
              <View style={styles.placeContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.placeText}>{place.name}</Text>
                  <Text style={styles.placeText}>{place.description}</Text>
                  {openCalendarPlace === place.name && (
                    <>
                      <CalendarScreen
                        placeName={place.name}
                        onDateSelect={handleStartDateSelect}
                      />
                      <CalendarScreen
                        placeName={place.name}
                        onDateSelect={handleEndDateSelect}
                      />
                    </>
                  )}
                  {selectedStartDate[place.name] && (
                    <Text style={styles.selectedDate}>Start Date: {selectedStartDate[place.name]}</Text>
                  )}
                  {selectedEndDate[place.name] && (
                    <Text style={styles.selectedDate}>End Date: {selectedEndDate[place.name]}</Text>
                  )}
                  <TouchableOpacity
                    style={styles.selectDateButton}
                    onPress={() => setOpenCalendarPlace(openCalendarPlace === place.name ? null : place.name)}
                  >
                    <Text style={styles.selectDateButtonText}>Select Start Date</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.selectDateButton}
                    onPress={() => setOpenCalendarPlace(openCalendarPlace === place.name ? null : place.name)}
                  >
                    <Text style={styles.selectDateButtonText}>Select End Date</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => toggleHeart(place)}>
                    <Ionicons
                      name={isHearted(place) ? 'heart' : 'heart-outline'}
                      size={24}
                      marginTop={-65}
                      color={isHearted(place) ? 'red' : 'orange'}
                    />
                  </TouchableOpacity>
                <Image style={styles.placeImage} source={{ uri: place.image }} />
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={navigateToItinerary} style={styles.addButton}>
          <Text style={styles.addButtonText}>Create a Travel Plan Here</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const StoredItineraryStack = ({ route }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
      }}
    >
      <HomeStack.Screen
        name="StoredItinerary"
        component={(props) => <StoredItineraryScreen {...props} route={route} />}
      />
      <HomeStack.Screen
        name="Calendar"
        component={CalendarScreen}
      />
    </HomeStack.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: 'lightyellow',
  },
  title: {
    marginTop: 80,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placesContainer: {
    marginBottom: 20,
  },
  placeContainer: {
    marginBottom: 20,
  },
  placeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  placeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  placeImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  selectedDate: {
    fontSize: 14,
    marginBottom: 5,
    color: 'gray',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  addButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  selectDateButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  selectDateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default StoredItineraryStack;
