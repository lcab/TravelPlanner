import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getDatabase, ref, set, remove, onValue, get, update } from "firebase/database";


const ItineraryScreen = () => {
  const [days, setDays] = useState([{ todos: [''] }]);
  const [heartedPlaces, setHeartedPlaces] = useState([]);


  useEffect(() => {
    const db = getDatabase();
    const heartedPlacesGet = ref(db, 'locations');

    const unsubscribe = onValue(heartedPlacesGet, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const heartedPlacesArray = Object.values(data);
        setHeartedPlaces(heartedPlacesArray);
      } else {
        setHeartedPlaces([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);



  const addDay = (place) => {
    const db = getDatabase();
    const placeRef = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days`);
  
    // Get the reference to the location's days
    get(placeRef).then((snapshot) => {
      const daysData = snapshot.val();
      if (daysData) {
        // Calculate the index of the last day
        const lastDayIndex = Object.keys(daysData).reduce((maxIndex, key) => {
          const dayNumber = parseInt(key.replace('day', ''));
          return Math.max(maxIndex, dayNumber);
        }, 0);
  
        // Calculate the new day number
        const newDayNumber = (lastDayIndex + 1).toString().padStart(2, '0');
  
        // Construct the reference for the new day
        const newDayRef = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newDayNumber}`);
  
        // Add the new day to the database
        set(newDayRef, { ToDos: [''] }).then(() => {
          console.log('New day added successfully');
        }).catch((error) => {
          console.error("Error adding new day: ", error);
        });
      } else {
        console.log("No existing days found. Adding the first day.");
        // If there are no existing days, add the first day
        set(placeRef, { day01: { ToDos: [''] } }).then(() => {
          console.log('First day added successfully');
        }).catch((error) => {
          console.error("Error adding first day: ", error);
        });
      }
    }).catch((error) => {
      console.error("Error retrieving days data: ", error);
    });
  };

  const addTodo = (place, dayIndex) => {


    const dayKeys = Object.keys(place.Days);
    const dayKeyAtIndex = dayKeys[dayIndex];
    const dayNumber = parseInt(dayKeyAtIndex.replace('day', ''));
    const newdayNumber = dayNumber.toString().padStart(2, '0');

    console.log(`Day number for day at index ${dayIndex}: ${newdayNumber}`);

    const db = getDatabase();
    const placeRef = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newdayNumber}/ToDos`);
    update(placeRef, { todos: '' }).then(() => {
      console.log('Todo section updated successfully');
    }).catch((error) => {
      console.error("Error updating todo section: ", error);
    });

  };

  const updateTodo = (place, dayIndex, todoIndex, text) => {
    try {
      const dayKeys = Object.keys(place.Days);
      const dayKeyAtIndex = dayKeys[dayIndex];
      const dayNumber = parseInt(dayKeyAtIndex.replace('day', ''));
      const newdayNumber = dayNumber.toString().padStart(2, '0');

      const db = getDatabase();
      const todoRef = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newdayNumber}/ToDos`);

      update(todoRef, { [todoIndex]: text }).then(() => {
        console.log('Todo updated successfully');
      }).catch((error) => {
        console.error("Error updating todo section: ", error);
      });

    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = (place, dayIndex, todoIndex) => {


    const dayKeys = Object.keys(place.Days);
    const dayKeyAtIndex = dayKeys[dayIndex];
    const dayNumber = parseInt(dayKeyAtIndex.replace('day', ''));
    const newdayNumber = dayNumber.toString().padStart(2, '0');

    console.log(`Day number for day at index ${dayIndex}: ${newdayNumber}`);

    const db = getDatabase();
    const placeRef = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newdayNumber}/ToDos/${todoIndex}`);


    remove(placeRef).then(() => {
      console.log('Todo section updated successfully');
    }).catch((error) => {
      console.error("Error updating todo section: ", error);
    });

  };

  const deleteDay = (place, dayIndex) => {
    const updatedDays = [...days];
    updatedDays.splice(dayIndex, 1);
    setDays(updatedDays);

    const dayKeys = Object.keys(place.Days);
    const dayKeyAtIndex = dayKeys[dayIndex];
    const dayNumber = parseInt(dayKeyAtIndex.replace('day', ''));

    const newdayNumber = dayNumber.toString().padStart(2, '0');
    console.log(`Day number for day at index ${dayIndex}: ${newdayNumber}`);

    const db = getDatabase();
    const placeRef = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newdayNumber}`);

    remove(placeRef).then(() => {
      console.log('Todo section updated successfully');
    }).catch((error) => {
      console.error("Error updating todo section: ", error);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Daily Trip Itinerary</Text>
      <Text style={styles.text}>How To Use:</Text>
      <Text style={styles.text}>Write the things you want to do daily each day you are planning to visit. You can add the amount of days and amount of things you have planned by clicking the add day or add to do item button! If you would like to remove a day/item, simply click on the delete button next to the item/day.</Text>
      {heartedPlaces.length > 0 && heartedPlaces.map((place, index) => (
        <View key={index}>
          <Text style={styles.placeText}>{place.name}</Text>
          <Text style={styles.placeText}>{place.description}</Text>
          <TouchableOpacity onPress={() => addDay(place)} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Day</Text>
          </TouchableOpacity>
          {place.Days && Object.keys(place.Days).map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dayContainer}>
              <View style={styles.dayHeaderContainer}>
                <Text style={styles.dayHeader}>Day {dayIndex + 1}:</Text>
                <TouchableOpacity onPress={() => deleteDay(place, dayIndex)}>
                  <Text style={styles.deleteButtonText}>Delete Day</Text>
                </TouchableOpacity>
              </View>
              {place.Days[day].ToDos && Object.keys(place.Days[day].ToDos).map((todo, todoIndex) => (
                <View key={todoIndex} style={styles.todoItemContainer}>
                  <TextInput
                    style={styles.todoItemInput}
                    placeholder="Add a to-do item"
                    value={place.Days[day].ToDos[todoIndex]}
                    onChangeText={(text) => updateTodo(place, dayIndex, todoIndex, text)}
                  />
                  <TouchableOpacity onPress={() => deleteTodo(place, dayIndex, todoIndex)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity onPress={() => addTodo(place, dayIndex)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add To-Do Item</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  text: {
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
