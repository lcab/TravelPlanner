import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getDatabase, ref, set, remove, onValue, get, update } from "firebase/database";


const ItineraryScreen = () => {
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
    const dayMainLocation = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days`);

    get(dayMainLocation).then((snapshot) => {
      const daysData = snapshot.val();
      if (daysData) {
        const lastDayIndex = Object.keys(daysData).reduce((maxIndex, key) => {
          const dayNumber = parseInt(key.replace('day', ''));
          return Math.max(maxIndex, dayNumber);
        }, 0);

        const newDayNumber = (lastDayIndex + 1).toString().padStart(2, '0');
        const dayLocation = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newDayNumber}`);

        set(dayLocation, { ToDos: [''] }).then(() => {
          console.log('New day added');
        }).catch((error) => {
          console.error("Error adding new day", error);
        });
      } else {
        set(dayMainLocation, { day01: { ToDos: [''] } }).then(() => {
          console.log('First day added');
        }).catch((error) => {
          console.error("Error adding first day", error);
        });
      }
    }).catch((error) => {
      console.error("Error adding days", error);
    });
  };

  const addTodo = (place, dayIndex) => {

    const allDaysArray = Object.keys(place.Days);
    const dayAtIndex = allDaysArray[dayIndex];
    const dayNumber = parseInt(dayAtIndex.replace('day', ''));
    const newdayNumber = dayNumber.toString().padStart(2, '0');

    console.log(`Day number for day at index ${dayIndex}: ${newdayNumber}`);

    const db = getDatabase();
    const dayMainLocation = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newdayNumber}/ToDos`);
    update(dayMainLocation, { todos: '' }).then(() => {
      console.log('Todo added');
    }).catch((error) => {
      console.error("Error adding todo", error);
    });

  };

  const updateTodo = (place, dayIndex, todoIndex, text) => {
    try {
      const allDaysArray = Object.keys(place.Days);
      const dayAtIndex = allDaysArray[dayIndex];
      const dayNumber = parseInt(dayAtIndex.replace('day', ''));
      const newdayNumber = dayNumber.toString().padStart(2, '0');

      const db = getDatabase();
      const todoRef = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newdayNumber}/ToDos`);

      update(todoRef, { [todoIndex]: text }).then(() => {
        console.log('Todo updated');
      }).catch((error) => {
        console.error("Error updating todo", error);
      });

    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  const deleteTodo = (place, dayIndex, todoIndex) => {


    const allDaysArray = Object.keys(place.Days);
    const dayAtIndex = allDaysArray[dayIndex];
    const dayNumber = parseInt(dayAtIndex.replace('day', ''));
    const newdayNumber = dayNumber.toString().padStart(2, '0');

    console.log(`Day number for day at index ${dayIndex}: ${newdayNumber}`);

    const db = getDatabase();
    const dayMainLocation = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newdayNumber}/ToDos/${todoIndex}`);


    remove(dayMainLocation).then(() => {
      console.log('Todo section deleted');
    }).catch((error) => {
      console.error("Error deleting todo", error);
    });

  };

  const deleteDay = (place, dayIndex) => {

    const allDaysArray = Object.keys(place.Days);
    const dayAtIndex = allDaysArray[dayIndex];
    const dayNumber = parseInt(dayAtIndex.replace('day', ''));

    const newdayNumber = dayNumber.toString().padStart(2, '0');
    console.log(`Day number for day at index ${dayIndex}: ${newdayNumber}`);

    const db = getDatabase();
    const dayMainLocation = ref(db, `locations/${place.name.replace(/\s+/g, '')}/Days/day${newdayNumber}`);

    remove(dayMainLocation).then(() => {
      console.log('Deleted the Day');
    }).catch((error) => {
      console.error("Error deleting Day", error);
    });
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>My Daily Trip Itinerary</Text>
      <View style={styles.textBackground}>
        <Text style={styles.howToHeader}>How To Use:</Text>
        <Text style={styles.text}>Write the things you want to do daily each day you are planning to visit. You can add the amount of days and amount of things you have planned by clicking the add day or add to do item button! If you would like to remove a day/item, simply click on the delete button next to the item/day.</Text>
      </View>
      {heartedPlaces.length > 0 && heartedPlaces.map((place, index) => (
        <View key={index}>
          <Text style={styles.placeTextName}>{place.name} Plans:</Text>
          <Text style={styles.placeText}>{place.description}</Text>
          {(!place.startDate || !place.endDate) &&
            <Text style={styles.dateText}>
              (Go to StoredItineraryScreen to pick all dates:
              {place.startDate && <Text style={styles.dateText}> Start Date: {place.startDate}</Text>}
              {place.endDate && <Text style={styles.dateText}> End Date: {place.endDate}</Text>})
            </Text>
          }

          {(place.startDate && place.endDate) &&
            <Text style={styles.dateText}>
              Start Date: {place.startDate}, End Date: {place.endDate}
            </Text>
          }
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
              {index !== heartedPlaces.length - 1 && <View style={styles.horizontalLine} />}
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
    textAlign: 'center',
  },
  howToHeader: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',

  },
  placeTextName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
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
    fontSize: 18,
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
    backgroundColor: 'darkorange',
    paddingHorizontal: 10,
    marginRight: 200,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: 'flex-start',

  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: 'darkorange',
    marginLeft: 10,
    marginHorizontal: 10,

  },
  textBackground: {
    backgroundColor: 'darkorange',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default ItineraryScreen;
