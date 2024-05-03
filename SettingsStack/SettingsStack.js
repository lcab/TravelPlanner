// ExpensesScreen.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import EditAccount from './EditAccount';
import SettingScreen from './SettingScreen';

const Stack = createStackNavigator();

const SettingsStack = ({ user }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings">
        {(props) => <SettingScreen {...props} user={user} />}
      </Stack.Screen>
      <Stack.Screen name="EditAccount">
        {(props) => <EditAccount {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>

  );
};

export default SettingsStack;