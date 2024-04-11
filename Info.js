//Complete the code for the RecipeDetailsScreen 
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const Info=({navigation, route}) => {
  const {location} = route.params;
  const goBack=() => {
    navigation.goBack();
  };

  return (
    <View style = {styles.container}>
    <Text style = {styles.title}>{location.title}</Text>
    <Text style = {styles.subtitle}>Places:</Text>
    {location.places.map((places, index) => (<Text key = {index}>{places}</Text>
    ))}
    <Text style = {styles.subtitle}>Details:</Text>
    <Text> {location.details}</Text>
    <Button title = "Go Back" onPress = {goBack}/>
    </View>
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default Info;
