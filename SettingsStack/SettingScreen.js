import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { screenStyles } from '../styles';

const Stack = createStackNavigator();

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedOption, setSelectedOption] = useState('Option 1');


  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>
      
      <View style={styles.settingItem}>
        <Text>Enable Notifications</Text>
        <Switch 
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>

      <Button title="Change your Profile" onPress={() => navigation.navigate('EditAccount')} />

    </View>
  );
}

export default SettingsScreen;