import React, { useState } from 'react';
import { View, Text, Switch, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import userImage from '../user.png';

const Stack = createStackNavigator();

const SettingsScreen = ({ navigation }) => {

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [username, setUsername] = useState('JohnDoe'); 
  const [name, setName] = useState('John Doe');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('EditAccount')}>
        <Image
          source={userImage}
          style={styles.profileImage}
        />
        <View style={styles.editIconContainer}>
          <Feather name="edit" size={24} color="#cc5803" />
        </View>
      </TouchableOpacity>

      <Text style={styles.username}>{username}</Text>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.switchContainer}>
        <Text>Enable Dark Mode</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderColor: '#cc5803',
    borderWidth: 2,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 50,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#cc5803',
    transform: [{ translateX: -8 }, { translateY: -8 }],
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  switchContainer: {
    alignItems: 'center',
  },
});

export default SettingsScreen;
