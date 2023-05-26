import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import SearchBar from '../components/ui/SearchBar';
import CollectionList from '../components/ui/CollectionList';

type RootStackParamList = {
  Contacts: undefined;
  Collections: undefined;
  SavedSearches: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Collections'>;

const Collections = ({ navigation }: Props) => {
  return (
    <View style={styles.mainContainer}>
      <SearchBar />
      <CollectionList navigation={navigation} />
    </View>
  );
};

export default Collections;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
