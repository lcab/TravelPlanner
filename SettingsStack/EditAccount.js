import React, { useState } from 'react';
import { View, Text, Switch, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { screenStyles } from '../styles';

const Stack = createStackNavigator();



const EditAccount = ({ navigation, user }) => {
  console.log(user);

  const { uid, displayName, email, photoURL } = user;
  const [username, setUsername] = useState(email);
  const [changeName, setChangeName] = useState(displayName ? displayName : '');
  const [changeEmail, setChangeEmail] = useState(email);
  const [password, setPassword] = useState('');


  const handleSave = async () => {
    try {

      if (changeName !== displayName) {
        await auth.currentUser.updateProfile({
          displayName: changeName,
        });
      }

      if (changeEmail !== email) {
        await auth.currentUser.updateEmail(changeEmail);
      }


      alert('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Error updating user profile. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit User</Text>
      <TouchableOpacity>
        <Image
          source={{ uri: photoURL }}
          style={styles.profileImage}
        />
        <View style={styles.editIconContainer}>
          <Feather name="edit" size={24} color="#cc5803" />
        </View>
      </TouchableOpacity>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={changeName}
        onChangeText={setChangeName}
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={changeEmail}
        onChangeText={setChangeEmail}
        keyboardType="email-address"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
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
});

export default EditAccount;
