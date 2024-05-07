import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import CalendarScreen from './CalendarScreen';
import ItineraryScreen from './ItineraryScreen';

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
  const [openStartDateCalendar, setOpenStartDateCalendar] = useState(null);
  const [openEndDateCalendar, setOpenEndDateCalendar] = useState(null);

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
    setOpenStartDateCalendar(null); 
  };
  
  const handleEndDateSelect = (placeName, date) => {
    setSelectedEndDate(prevSelectedEndDate => ({
      ...prevSelectedEndDate,
      [placeName]: date,
    }));
    setOpenEndDateCalendar(null); 
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
                  <TouchableOpacity onPress={() => removeHeart(place)}>
                    <Ionicons
                      name={isHearted(place) ? 'heart' : 'heart-outline'}
                      size={24}
                      marginTop={-50}
                      marginLeft={250}
                      color={isHearted(place) ? 'red' : 'orange'}
                    />
                  </TouchableOpacity>
                  <Image style={styles.placeImage} source={{ uri: place.image }} />
                  <Text style={styles.placeText}>{place.description}</Text>
                  {openStartDateCalendar === place.name && (
                    <CalendarScreen
                      placeName={place.name}
                      onDateSelect={handleStartDateSelect}
                    />
                  )}
                  {openEndDateCalendar === place.name && (
                    <CalendarScreen
                      placeName={place.name}
                      onDateSelect={handleEndDateSelect}
                    />
                  )}
                  {selectedStartDate[place.name] && (
                    <Text style={styles.selectedDate}>Start Date: {selectedStartDate[place.name]}</Text>
                  )}
                  {selectedEndDate[place.name] && (
                    <Text style={styles.selectedDate}>End Date: {selectedEndDate[place.name]}</Text>
                  )}
                  <TouchableOpacity
                    style={styles.selectDateButton}
                    onPress={() => setOpenStartDateCalendar(openStartDateCalendar === place.name? null : place.name)}
                  >
                    <Text style={styles.selectDateButtonText}>Select Start Date</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.selectDateButton}
                    onPress={() => setOpenEndDateCalendar(openEndDateCalendar === place.name? null : place.name)}
                  >
                    <Text style={styles.selectDateButtonText}>Select End Date</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.createPlanButton}
                    onPress={() => navigation.navigate('ItineraryScreen', { place:place})}
                  >
                    <Text style={styles.createPlanButtonText}>Create Travel Plan</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            </View>
          ))}
        </View>
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
        component={StoredItineraryScreen}
        initialParams={route.params}
      />
      <HomeStack.Screen
        name="Calendar"
        component={CalendarScreen}
      />
      <HomeStack.Screen
        name="ItineraryScreen"
        component={ItineraryScreen}
        options={({ route }) => ({ 
          title: 'Itinerary', 
          place: route.params.place,
          numberOfDays: route.params.place.numberOfDays 
        })}
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
    marginTop: 30,
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
  
  placeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  placeText: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },
  placeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 12,
    color: '#ff6a06',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  createPlanButton: {
    backgroundColor: '#ff9147',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  createPlanButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectDateButton: {
    backgroundColor: '#ffa05f',
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
