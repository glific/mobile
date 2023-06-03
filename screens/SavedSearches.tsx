import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SearchBar from '../components/ui/SearchBar';

const SavedSearches = () => {
  return (
    <View style={styles.mainContainer}>
      <SearchBar  width="85%"/>
      <Text>SavedSearches</Text>
    </View>
  );
};

export default SavedSearches;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
