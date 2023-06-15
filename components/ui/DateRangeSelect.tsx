import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props {
  selectedDateFrom: string;
  selectedDateTo: string;
  onSelectDateFrom: (text: string) => void;
  onSelectDateTo: (text: string) => void;
  label: string;
}

const DateRangeSelect: React.FC<Props> = ({
  selectedDateFrom,
  selectedDateTo,
  onSelectDateFrom,
  onSelectDateTo,
  label,
}) => {
  const [isVisibleFromPicker, setIsVisibleFromPicker] = useState(false);
  const [isVisibleToPicker, setIsVisibleToPicker] = useState(false);

  const handleDateFromVisible = () => {
    setIsVisibleFromPicker(!isVisibleFromPicker);
  };
  const handleDateToVisible = () => {
    setIsVisibleToPicker(!isVisibleToPicker);
  };

  const handleDate = (date: object, input: string) => {
    const dateArr = new Date(date).toISOString().split('T')[0].split('-');

    if (input == 'from') {
      onSelectDateFrom(`${dateArr[2]}/${dateArr[1]}/${dateArr[0].slice(2)}`);
    } else {
      onSelectDateTo(`${dateArr[2]}/${dateArr[1]}/${dateArr[0].slice(2)}`);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.datesContainer}>
        <Pressable style={styles.dateButton} onPress={handleDateFromVisible}>
          <DateTimePickerModal
            isVisible={isVisibleFromPicker}
            mode="date"
            onConfirm={(date) => handleDate(date, 'from')}
            onCancel={handleDateFromVisible}
          />
          {selectedDateFrom == '' ? (
            <Text style={styles.placeholderText}>Date from</Text>
          ) : (
            <Text style={styles.dateText}>{selectedDateFrom}</Text>
          )}
          <MaterialCommunityIcons name="calendar" style={styles.calendarIcon} />
        </Pressable>
        <View style={styles.divideSpace} />
        <Pressable style={styles.dateButton} onPress={handleDateToVisible}>
          <DateTimePickerModal
            isVisible={isVisibleToPicker}
            mode="date"
            onConfirm={(date) => handleDate(date, 'to')}
            onCancel={handleDateToVisible}
          />
          {selectedDateTo == '' ? (
            <Text style={styles.placeholderText}>Date to</Text>
          ) : (
            <Text style={styles.dateText}>{selectedDateTo}</Text>
          )}
          <MaterialCommunityIcons name="calendar" style={styles.calendarIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default DateRangeSelect;

const styles = StyleSheet.create({
  calendarIcon: {
    color: COLORS.primary400,
    fontSize: 18,
  },
  dateButton: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: 10,
    borderWidth: 0.75,
    flex: 1,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dateText: {
    color: COLORS.black,
    fontSize: 14,
  },
  datesContainer: {
    flexDirection: 'row',
  },
  divideSpace: { width: '4%' },
  label: {
    color: COLORS.black,
    fontSize: 14,
    marginBottom: 8,
  },
  mainContainer: {
    marginVertical: 8,
    width: '100%',
  },
  placeholderText: {
    color: COLORS.darkGray,
    fontSize: 16,
  },
});
