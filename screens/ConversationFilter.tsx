import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';

import { COLORS, SCALE, SIZES } from '../constants';
import { RootStackParamList } from '../constants/types';
import DateRangeSelect from '../components/ui/DateRangeSelect';
import MultiSelect from '../components/ui/MultiSelect';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { GET_USERS } from '../graphql/queries/User';
import { GET_ALL_FLOW_LABELS } from '../graphql/queries/Flows';
import { GET_COLLECTIONS_LIST } from '../graphql/queries/Collection';

interface OptionType {
  id: string;
  name?: string;
  label?: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'ConversationFilter'>;

const ConversationFilter = ({ navigation, route }: Props) => {
  const { onGoBack } = route.params;

  const [name, setName] = useState('');
  const [selectLabels, setSelectLabels] = useState<OptionType[]>([]);
  const [selectCollections, setSelectCollections] = useState<OptionType[]>([]);
  const [selectStaffs, setSelectStaffs] = useState<OptionType[]>([]);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const { data: labelList } = useQuery(GET_ALL_FLOW_LABELS, {
    variables: {
      filter: {},
      opts: { limit: null, offset: 0, order: 'ASC' },
    },
  });

  const { data: collectionList } = useQuery(GET_COLLECTIONS_LIST, {
    variables: {
      filter: {},
      opts: { limit: null, offset: 0, order: 'ASC' },
    },
  });

  const { data: userList } = useQuery(GET_USERS, {
    variables: {
      filter: {},
      opts: { limit: null, offset: 0, order: 'ASC' },
    },
  });

  const nameChanged = (value: string) => {
    setName(value);
  };
  const handleSelectLabel = (options: OptionType[]) => {
    setSelectLabels(options);
  };
  const handleSelectCollection = (options: OptionType[]) => {
    setSelectCollections(options);
  };
  const handleSelectStaff = (options: OptionType[]) => {
    setSelectStaffs(options);
  };

  const onDateFrom = (date: Date | null) => {
    setDateFrom(date);
  };
  const onDateTo = (date: Date | null) => {
    setDateTo(date);
  };

  const handleSearch = () => {
    const groups = selectCollections.map((group) => {
      return group.id;
    });
    const labels = selectLabels.map((label) => {
      return label.id;
    });
    const users = selectStaffs.map((user) => {
      return user.id;
    });

    onGoBack({
      filter: {
        term: name,
        includeLabels: labels,
        includeGroups: groups,
        includeUsers: users,
        dateRange: {
          from: dateFrom,
          to: dateTo,
        },
      },
      contactOpts: { limit: 25 },
      messageOpts: { limit: 1 },
    });
    navigation.goBack();
  };

  const handleCancel = () => {
    setSelectLabels([]);
    setSelectCollections([]);
    setSelectStaffs([]);
    setDateFrom(null);
    setDateTo(null);
    navigation.goBack();
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
          options={labelList?.flowLabels}
          selectedOptions={selectLabels}
          onSelectOption={handleSelectLabel}
          label="Include Labels"
          placeHolder="Age group"
        />
        <MultiSelect
          testID="collectionSelect"
          options={collectionList?.groups}
          selectedOptions={selectCollections}
          onSelectOption={handleSelectCollection}
          label="Includes Collections"
          placeHolder="Variable"
        />
        <MultiSelect
          testID="staffSelect"
          options={userList?.users}
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
        <Button onPress={handleCancel} type="neutral">
          <Text>CANCEL</Text>
        </Button>
        <View style={styles.divideSpace} />
        <Button onPress={handleSearch}>
          <Text>SEARCH</Text>
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
