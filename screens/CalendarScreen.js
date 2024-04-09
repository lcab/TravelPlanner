import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import * as CalendarAPI from 'expo-calendar';
import { screenStyles } from '../styles';

export default function CalendarScreen() {
  const [calendars, setCalendars] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState({});

  useEffect(() => {
    fetchCalendars();
    loadAllEvents();
  }, []);

  const fetchCalendars = async () => {
    const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const fetchedCalendars = await CalendarAPI.getCalendarsAsync(CalendarAPI.EntityTypes.EVENT);
      setCalendars(fetchedCalendars);
    }
  };

  const loadAllEvents = async () => {
    const calendars = await CalendarAPI.getCalendarsAsync(CalendarAPI.EntityTypes.EVENT);
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); 

    const allEvents = {};
    for (const calendar of calendars) {
      const events = await CalendarAPI.getEventsAsync([calendar.id], startDate, endDate);
      for (const date in events) {
        if (events[date].length > 0) {
          allEvents[date] = events[date];
        }
      }
    }
    setEvents(allEvents);
  };

  const loadEvents = async (day) => {
    const startDate = new Date(day.dateString);
    const endDate = new Date(day.dateString);
    endDate.setDate(endDate.getDate() + 1);

    try {
      const events = await CalendarAPI.getEventsAsync([CalendarAPI.EntityTypes.EVENT], startDate, endDate);
      if (events) {
        console.log('Events:', events);
        setEvents({ ...events, [day.dateString]: events });
      } else {
        console.log('No events found for the selected day.');
        setEvents((prevEvents) => ({ ...prevEvents, [day.dateString]: [] }));
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    loadEvents(day);
  };

const renderDay = (day, item) => {
  const hasEvents = events[day.dateString] && events[day.dateString].length > 0;
  return (
    <View style={styles.dayContainer}>
      <Text style={styles.day}>{day.day}</Text>
      <View style={[styles.eventIndicatorContainer, { opacity: hasEvents ? 1 : 0 }]}>
        <View style={styles.eventIndicator} />
      </View>
    </View>
  );
};

  const createCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await CalendarAPI.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: CalendarAPI.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: CalendarAPI.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    fetchCalendars();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calendars</Text>
      <View style={styles.calendarContainer}>
        <CalendarList
          onDayPress={handleDayPress}
          markedDates={{ [selectedDay]: { selected: true, selectedColor: 'blue' } }}
          renderDay={renderDay}
        />
      </View>
      <View style={styles.eventContainer}>
        <Text style={styles.eventHeader}>Events for {selectedDay}</Text>
        {events[selectedDay]?.map((event) => (
          <Text key={event.id} style={styles.event}>
            {event.title}
          </Text>
        ))}
      </View>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await CalendarAPI.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarContainer: {
    flex: 1,
    width: '100%',
  },
  eventContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  eventHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  event: {
    fontSize: 16,
    marginBottom: 5,
  },

   dayContainer: {
    alignItems: 'center',
  },
  day: {
    fontSize: 18,
    marginBottom: 5,
  },
  eventIndicatorContainer: {
    position: 'absolute',
    bottom: 5,
    alignItems: 'center',
  },
  eventIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginTop: 2,
  },
});
