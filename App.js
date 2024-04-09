import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import SettingScreen from './screens/SettingScreen';

const Tab = createBottomTabNavigator();

const colors = {
  primary: '#f7934c',   
  secondary: '#cc5803', 
  background: '#fefae0', 
  text: '#1f1300'       
};

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Calendar') {
              iconName = 'calendar';
            } else if (route.name === 'Itinerary') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Setting') {
              iconName = 'settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.text,
          style: styles.tabBar,
        }}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen styles={styles} />}
        </Tab.Screen>
        <Tab.Screen name="Calendar">
          {() => <CalendarScreen styles={styles} />}
        </Tab.Screen>
        <Tab.Screen name="Itinerary">
          {() => <ItineraryScreen styles={styles} />}
        </Tab.Screen>
        <Tab.Screen name="Setting">
          {() => <SettingScreen styles={styles} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopColor: colors.primary,
  },
});

export default App;
