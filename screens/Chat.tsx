import React, { useState, useEffect } from 'react';
import {StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ContactList from '../components/ui/ContactList';
import SearchBar from '../components/ui/SearchBar';
import Storage from '../utils/asyncStorage';
import { COLORS, SIZES } from '../constants';

type RootStackParamList = {
  Contacts: undefined;
  Collections: undefined;
  SavedSearches: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

const Chat = ({ navigation }: Props) => {
  const [session, setSession] = useState<object | null>();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    // Retrieve the session from AsyncStorage
    const getSession = async () => {
      const sessionValue = await Storage.getData('session');
      if (sessionValue !== null) {
        const parsedSessionValue = JSON.parse(sessionValue);
        setSession(parsedSessionValue);
      }
    };

    getSession();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <SearchBar setSearchValue={(value) => setSearchValue(value)} width="75%" showMenu={true} />
      <View style={styles.mainIconContainer}></View>
      <ContactList navigation={navigation} searchValue={searchValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f20,
  },
  mainContainer: {
    flex: 1,
  },
  mainIconContainer: {
    marginLeft: -SIZES.m6,
    width: '15%',
  },
});

export default Chat;
