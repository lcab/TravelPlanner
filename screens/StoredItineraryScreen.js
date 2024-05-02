import React, { useState }  from 'react';
import { View, Text, StyleSheet,TouchableOpacity , ScrollView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

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
    <View style={{ flexDirection: 'row',  alignItems: 'center', paddingLeft: 10, top: 50, paddingBottom: 70}}>
      <TouchableOpacity onPress={navigateToCalendar}>
        <FontAwesome name="calendar" size={24} color="orange" style={{ marginRight: 16 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToStoredItinerary}>
        <FontAwesome name="heart" size={24} color="orange" />
      </TouchableOpacity>
    </View>
  );
}

const StoredItineraryScreen = ({ route}) => {
  console.log(route);
  const [selectedDates, setSelectedDates] = useState({});

  
  const handleDateSelect = (placeName, date) => {
    setSelectedDates(prevSelectedDates => ({
      ...prevSelectedDates,
      [placeName]: date,
    }));
  };

  if (!route || !route.params || !route.params.hearts) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No hearted places found.</Text>
      </View>
    );
  }

  const { hearts } = route.params;

  return (
    <View style={styles.container}>

      <ScrollView style={styles.container}>
      <Text style={styles.title}>Stored Itinerary</Text>
      <Text style={styles.subtitle}>Hearted Places:</Text>
      <View style={styles.placesContainer}>
        {hearts.map((place, index) => (
          <View key={index} style={styles.placeContainer}>
            <Text style={styles.placeText}>{place.name}</Text>
            <Text style={styles.selectedDate}>Selected Date: {selectedDates[place.name]}</Text>
            <CalendarScreen placeName={place.name} onDateSelect={handleDateSelect} />
          </View>
        ))}
      </View>
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
  placeText: {
    fontSize: 16,
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
});
export default StoredItineraryStack;
