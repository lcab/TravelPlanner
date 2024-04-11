import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { screenStyles } from '../styles';

const Stack = createStackNavigator();



const EditAccount = ({ navigation }) => {


  const [username, setUsername] = useState('currentUsername');
  const [name, setName] = useState('Current Name');
  const [email, setEmail] = useState('current@example.com');
  const [password, setPassword] = useState('');


  const handleSave = () => {
    setUsername(username);
    setName(name);
    setEmail(email);
    setPassword(password);
    setNotificationsEnabled(notificationsEnabled);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit User</Text>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        editable={false}
      />
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
  }
});

export default EditAccount;
