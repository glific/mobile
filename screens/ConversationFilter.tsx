import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS, SCALE, SIZES } from '../constants';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import MultiSelect from '../components/ui/MultiSelect';
import DateRangeSelect from '../components/ui/DateRangeSelect';

const options = [
  { id: '1', label: 'Age Group 11 to 14' },
  { id: '2', label: 'Age Group  15 to 18' },
  { id: '3', label: 'Hindi' },
  { id: '4', label: 'Hindi' },
  { id: '5', label: 'Age Group  15 to 18' },
  { id: '6', label: 'Age Group  15 to 18' },
  { id: '7', label: 'Hindi' },
  { id: '8', label: 'English' },
  { id: '9', label: 'English' },
  { id: '10', label: 'Option 5' },
];

const ConversationFilter: React.FC = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [selectLabels, setSelectLabels] = useState([]);
  const [selectCollections, setSelectCollections] = useState([]);
  const [selectStaffs, setSelectStaffs] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const nameChanged = (value: string) => {
    setName(value);
  };
  const handleSelectLabel = (options: any) => {
    setSelectLabels(options);
  };
  const handleSelectCollection = (options: any) => {
    setSelectCollections(options);
  };
  const handleSelectStaff = (options: any) => {
    setSelectStaffs(options);
  };

  const onDateFrom = (date: string) => {
    console.log(date);
    setDateFrom(date);
  };
  const onDateTo = (date: string) => {
    console.log(date);
    setDateTo(date);
  };

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.headerText}>
          You can apply more parameters below to search for conversations.
        </Text>
        <Input
          testID="labelInput"
          onUpdateValue={nameChanged}
          value={name}
          placeholder="Enter name, label, keyword"
        />
        <MultiSelect
          testID="labelSelect"
          options={options}
          selectedOptions={selectLabels}
          onSelectOption={handleSelectLabel}
          label="Includes Labels"
          placeHolder="Age group"
        />
        <MultiSelect
          testID="collectionSelect"
          options={options}
          selectedOptions={selectCollections}
          onSelectOption={handleSelectCollection}
          label="Includes Collections"
          placeHolder="Variable"
        />
        <MultiSelect
          testID="staffSelect"
          options={options}
          selectedOptions={selectStaffs}
          onSelectOption={handleSelectStaff}
          label="Includes Staffs"
          placeHolder="Ngo main account"
        />
        <DateRangeSelect
          selectedDateFrom={dateFrom}
          selectedDateTo={dateTo}
          onSelectDateFrom={onDateFrom}
          onSelectDateTo={onDateTo}
          label="Data range"
        />
        <View style={{ marginBottom: SCALE(100) }} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()} type="neutral">
          <Text>CANCEL</Text>
        </Button>
        <View style={styles.divideSpace} />
        <Button disable={true} onPress={() => navigation.goBack()}>
          <Text>APPLY</Text>
        </Button>
      </View>
    </>
  );
};

export default ConversationFilter;

const styles = StyleSheet.create({
  buttonContainer: {
    bottom: SIZES.m16,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: SIZES.m12,
    position: 'absolute',
  },
  divideSpace: { width: '2%' },
  headerText: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginBottom: SIZES.m10,
    marginTop: SIZES.m24,
    width: '100%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: SIZES.m12,
  },
});
