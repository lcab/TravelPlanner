import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';


const Stack = createStackNavigator();

const SettingsScreen = ({ navigation, user }) => {

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>You are not logged in</Text>
      </View>
    );
  }

  const { displayName = '', photoURL = '' } = user;

  const [firstName, lastName] = displayName && displayName.split(' ');


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('EditAccount')}>
        <Image
          source={{ uri: photoURL }}
          style={styles.profileImage}
        />
        <View style={styles.editIconContainer}>
          <Feather name="edit" size={24} color="#cc5803" />
        </View>
      </TouchableOpacity>

      <Text style={styles.name}>{firstName}</Text>
      <Text style={styles.name}>{lastName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightyellow',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
});

export default SettingsScreen;
