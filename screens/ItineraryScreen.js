import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ItineraryScreen = () => {
  const [days, setDays] = useState([{ todos: [''] }]);

  const addDay = () => {
    setDays([...days, { todos: [''] }]);
  };

  const addTodo = (dayIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].todos.push('');
    setDays(updatedDays);
  };

  const updateTodo = (dayIndex, todoIndex, text) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].todos[todoIndex] = text;
    setDays(updatedDays);
  };

  const deleteTodo = (dayIndex, todoIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].todos.splice(todoIndex, 1);
    setDays(updatedDays);
  };

  const deleteDay = (dayIndex) => {
    const updatedDays = [...days];
    updatedDays.splice(dayIndex, 1);
    setDays(updatedDays);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Daily Trip Itinerary</Text>
      <Text style={styles.text}>How To Use:</Text>
      <Text style={styles.text}>Write the things you want to do daily each day you are planning to visit. You can add the amount of days and amount of things you have planned by clicking the add day or add to do item button! If you would like to remove a day/item, simply click on the delete button next to the item/day.</Text>
      <TouchableOpacity onPress={addDay} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Day</Text>
      </TouchableOpacity>
      {days.map((day, dayIndex) => (
        <View key={dayIndex} style={styles.dayContainer}>
          <View style={styles.dayHeaderContainer}>
            <Text style={styles.dayHeader}>Day {dayIndex + 1}:</Text>
            <TouchableOpacity onPress={() => deleteDay(dayIndex)}>
              <Text style={styles.deleteButtonText}>Delete Day</Text>
            </TouchableOpacity>
          </View>
          {day.todos.map((todo, todoIndex) => (
            <View key={todoIndex} style={styles.todoItemContainer}>
              <TextInput
                style={styles.todoItemInput}
                placeholder="Add a to-do item"
                value={todo}
                onChangeText={(text) => updateTodo(dayIndex, todoIndex, text)}
              />
              <TouchableOpacity onPress={() => deleteTodo(dayIndex, todoIndex)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={() => addTodo(dayIndex)} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add To-Do Item</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    backgroundColor: 'lightyellow',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text:{
fontSize: 10,
marginBottom: 15,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  todoItemInput: {
    flex: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 7,
    borderWidth: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#ff9147',
    paddingHorizontal: 10,
    marginRight: 200,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 15,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: 'orange',
    marginLeft: 10,
    marginHorizontal: 10,
    
  },
});

export default ItineraryScreen;
