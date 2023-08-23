import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { COLORS, SCALE, SIZES, Icon } from '../../constants';

interface Props {
  selectedDateFrom: Date | null;
  selectedDateTo: Date | null;
  // eslint-disable-next-line no-unused-vars
  onSelectDateFrom: (args: Date | null) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectDateTo: (args: Date | null) => void;
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleDateVisible = (dateType: string) => {
    if (dateType === 'from') setIsVisibleFromPicker(!isVisibleFromPicker);
    else setIsVisibleToPicker(!isVisibleToPicker);
  };

  const handleDate = (date: Date, input: string) => {
    if (input === 'from') {
      if (selectedDateTo) {
        onSelectDateTo(null);
      }
      onSelectDateFrom(date);
    } else {
      if (selectedDateFrom <= date) {
        setErrorMessage('');
        onSelectDateTo(date);
      } else {
        onSelectDateTo(null);
        setErrorMessage('To date should be >= selected from date.');
      }
    }
  };

  const formatDate = (date: Date) => {
    const dateArr = new Date(date).toISOString().split('T')[0].split('-');
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0].slice(2)}`;
  };

  const renderDateButton = (date: Date | null, dateType: 'from' | 'to') => {
    return (
      <Pressable
        testID={`${dateType}Pick`}
        style={styles.dateButton}
        onPress={() => handleDateVisible(dateType)}
      >
        <DateTimePickerModal
          isVisible={dateType === 'from' ? isVisibleFromPicker : isVisibleToPicker}
          mode="date"
          onConfirm={(date) => handleDate(date, dateType)}
          onCancel={() => handleDateVisible(dateType)}
        />
        {!date ? (
          <Text style={styles.placeholderText}>Date {dateType}</Text>
        ) : (
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        )}
        <Icon name="calendar" style={styles.calendarIcon} />
      </Pressable>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.datesContainer}>
        {renderDateButton(selectedDateFrom, 'from')}
        <View style={styles.divideSpace} />
        {renderDateButton(selectedDateTo, 'to')}
      </View>
      {errorMessage !== '' && <Text style={styles.errorLabel}>{errorMessage}</Text>}
    </View>
  );
};

export default DateRangeSelect;

const styles = StyleSheet.create({
  calendarIcon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f18,
  },
  dateButton: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    flex: 1,
    flexDirection: 'row',
    height: SIZES.s48,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m10,
  },
  dateText: {
    color: COLORS.black,
    fontSize: SIZES.f14,
  },
  datesContainer: {
    flexDirection: 'row',
  },
  divideSpace: { width: '4%' },
  errorLabel: {
    color: COLORS.error100,
    fontSize: SIZES.f14,
    marginTop: SIZES.m6,
  },
  label: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    marginBottom: SIZES.m8,
  },
  mainContainer: {
    marginVertical: SIZES.m8,
    width: '100%',
  },
  placeholderText: {
    color: COLORS.darkGray,
    fontSize: SIZES.f16,
  },
});
