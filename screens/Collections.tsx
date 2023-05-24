import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { client } from '../config/apollo';
import SearchBar from '../components/ui/SearchBar';
import ContactList from '../components/ui/ContactList';

type RootStackParamList = {
  Login: undefined;
  Contacts: undefined;
  ChatScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

const variables = {
  filter: { searchGroup: true},
  messageOpts: {
    limit: 3,
    offset: 0,
  },
  contactOpts: {
    limit: 10,
    offset: 0,
  },
};

const Collections = ({ navigation }: Props) => {
  return (
    <View style={styles.mainContainer}>
      <ApolloProvider client={client}>
        <SearchBar />
        <ContactList navigation={navigation} variables={variables} />
      </ApolloProvider>
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
