import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button,Image, StyleSheet, TouchableOpacity  } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons'; 


const Stack = createStackNavigator();

const SettingsScreen = ({ navigation }) => {

  const profileImageUrl = 'data:image/jpeg;base64,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';


  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedOption, setSelectedOption] = useState('Option 1');


  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.navigate('EditAccount')}>
        <Image
          source={{ uri: profileImageUrl }}
          style={styles.profileImage}
        />
          <View style={styles.editIconContainer}>
            <Feather name="edit" size={24} color="#cc5803" />
          </View>
      </TouchableOpacity>

      
      <View >
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
    borderRadius: 50,
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
});

export default SettingsScreen;