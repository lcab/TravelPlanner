import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CreateTravelPlanScreen = ({ navigation }) => {
  const [place, setPlace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const handleConfirmStartDate = (date) => {
    setStartDate(date.toISOString().split('T')[0]);
    setStartDatePickerVisible(false);
  };

  const handleConfirmEndDate = (date) => {
    setEndDate(date.toISOString().split('T')[0]);
    setEndDatePickerVisible(false);
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const handleCreatePlan = () => {
    console.log('Travel Plan Created:', { place, startDate, endDate });
    navigation.navigate('AnotherScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Place to Visit:</Text>
      <TextInput
        style={styles.input}
        value={place}
        onChangeText={setPlace}
        placeholder="Enter place name"
      />
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={showStartDatePicker}>
          <Text style={styles.datePickerLabel}>Start Date: {startDate}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmStartDate}
          onCancel={() => setStartDatePickerVisible(false)}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={showEndDatePicker}>
          <Text style={styles.datePickerLabel}>End Date: {endDate}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmEndDate}
          onCancel={() => setEndDatePickerVisible(false)}
        />
      </View>
      <Button title="Create Travel Plan" onPress={handleCreatePlan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  datePickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue',
  },
});

export default CreateTravelP
