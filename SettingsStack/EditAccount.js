import React, { useState } from 'react';
import { View, Text, Switch, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { getAuth, updateProfile } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { screenStyles } from '../styles';

const Stack = createStackNavigator();



const EditAccount = ({ navigation, user }) => {

  const { uid, displayName, email, photoURL } = user;
  const [changeName, setChangeName] = useState(displayName ? displayName : '');
  const [newPhotoURL, setNewPhotoURL] = useState(null);


  const handleSave = async () => {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    updateProfile(currentUser, {
      displayName: changeName,
      photoURL: newPhotoURL ? newPhotoURL : photoURL
    }).then(() => {
      alert('User profile updated successfully!');
    }).catch((error) => {
      alert('Error updating user profile. Please try again later.');
    });
  };


  const getProfilePic = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permission denied: No access to media');
    };

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewPhotoURL(result.assets[0].uri);
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit User</Text>
      <Text style={styles.buttonTitle}>Change Profile Picture (Click Here)</Text>
      <TouchableOpacity onPress={getProfilePic}>
        <Image
          source={{ uri: newPhotoURL ? newPhotoURL : photoURL }}
          style={styles.profileImage}
          
        />
        <View style={styles.editIconContainer}>
          <Feather name="edit" size={24} color="#cc5803" />
        </View>
      </TouchableOpacity>
      <Text>Change Name</Text>
      <TextInput
        style={styles.input}
        placeholder=" Change Name"
        value={changeName}
        onChangeText={setChangeName}
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
    backgroundColor: 'lightyellow',
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
  buttonTitle: {
    color: 'black',
  },
});

export default EditAccount;
