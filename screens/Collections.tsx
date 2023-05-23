import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/ui/SearchBar';

const Collections = () => {
  return (
    <View style={styles.mainContainer}>
      <SearchBar />
      <Text>Collections</Text>
    </View>
  );
};

export default Collections;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
