import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView , Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getDatabase, ref, onValue } from "firebase/database";

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

const StoredItineraryScreen = ({  navigation, route }) => {

  const [selectedDates, setSelectedDates] = useState({});
  const [heartedPlaces, setHeartedPlaces] = useState([]);

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

  const handleDateSelect = (placeName, date) => {
    setSelectedDates(prevSelectedDates => ({
      ...prevSelectedDates,
      [placeName]: date,
    }));
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
  console.log(heartedPlaces);
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
                  <FontAwesome name="heart" size={24} color="red" />
                  <Text style={styles.placeText}>{place.description}</Text>
                  <Text style={styles.selectedDate}>Selected Dates: {selectedDates[place.name]}</Text>
                </View>
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
  console.log(route);
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
});
export default StoredItineraryStack;
