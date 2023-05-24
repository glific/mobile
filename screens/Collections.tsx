import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { client } from '../config/apollo';
import SearchBar from '../components/ui/SearchBar';
import CollectionList from '../components/ui/CollectionList';

type RootStackParamList = {
  Login: undefined;
  Contacts: undefined;
  ChatScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

const Collections = ({ navigation }: Props) => {
  return (
    <View style={styles.mainContainer}>
      <ApolloProvider client={client}>
        <SearchBar />
        <CollectionList navigation={navigation} />
      </ApolloProvider>
    </View>
  );
};

export default Collections;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
