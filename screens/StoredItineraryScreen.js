import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { screenStyles } from '../styles';
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
    <View style={{ flexDirection: 'row',  alignItems: 'center', paddingLeft: 350, top: 50, paddingBottom: 70}}>
      <TouchableOpacity onPress={navigateToCalendar}>
        <FontAwesome name="calendar" size={24} color="orange" style={{ marginRight: 16 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToStoredItinerary}>
        <FontAwesome name="heart" size={24} color="orange" />
      </TouchableOpacity>
    </View>
  );
}

const StoredItineraryScreen = ({ navigation }) => {
  return (
    <View style={screenStyles.container}>
      <Text>Layout Stored Trip Screens here</Text>
    </View>
  );
}

const StoredItineraryStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        headerStyle: { backgroundColor: 'white' },
        headerTitle: '',
      }}
    >
      <HomeStack.Screen
        name="StoredItinerary"
        component={StoredItineraryScreen}
      />
      <HomeStack.Screen
        name="Calendar"
        component={CalendarScreen}
      />
    </HomeStack.Navigator>
  );
}

export default StoredItineraryStack;
