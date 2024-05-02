import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = ({ placeName, onDateSelect }) => {
  const handleDayPress = (day) => {
    onDateSelect(placeName, day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Date:</Text>
      <Calendar
        style={styles.calendar}
        onDayPress={handleDayPress}
        markedDates={{ [placeName]: { selected: true, marked: true } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calendar: {
    marginBottom: 10,
  },
});

export default CalendarScreen;
//test