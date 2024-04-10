// ExpensesScreen.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import EditAccount from './EditAccount';
import SettingScreen from './SettingScreen';

const Stack = createStackNavigator();

const SettingsStack  = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingScreen} />    
      <Stack.Screen name="EditAccount" component={EditAccount} />
    </Stack.Navigator>

  );
};

export default SettingsStack;