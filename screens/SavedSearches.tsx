import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SearchBar from '../components/ui/SearchBar';
import SaveSearchList from '../components/ui/SaveSearchList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type RootStackParamList = {
  SavedSearches: undefined;
};


type Props = NativeStackScreenProps<RootStackParamList, 'Collections'>;


const SavedSearches = ({ navigation }: Props) => {
  return (
    <View style={styles.mainContainer}>
      <SearchBar width="85%"/>
      <SaveSearchList navigation={navigation}/>

    </View>
  );
};

export default SavedSearches;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
