import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, tabBarStyles } from './styles'; 

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import SettingStack from './SettingsStack/SettingsStack';

const Tab = createBottomTabNavigator();

const App = () => {
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
          style: tabBarStyles.tabBar, 
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Itinerary" component={ItineraryScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Setting" component={SettingStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
