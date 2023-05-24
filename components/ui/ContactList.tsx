import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { GET_CONTACTS } from '../../graphql/queries/Contact';
import { useQuery } from '@apollo/client';

import Contact from './Contact';
import Loading from './Loading';

export interface Contacts {
  index: number;
  name: string | null;
}

const variables = {
  filter: {},
  messageOpts: {
    limit: 3,
    offset: 0,
  },
  contactOpts: {
    limit: 10,
    offset: 0,
  },
};

const ContactList: React.FC<any> = ({ navigation }: any) => {
  const { loading, error, data } = useQuery(GET_CONTACTS, { variables });

  // Display a loading indicator while the query is in progress
  if (loading) {
    return <Loading />;
  }
  // Handle the error
  if (error) {
    console.log(error);
  }

  let contacts = [];
  if (data) {
    contacts = data.search.map((element: any, idx: number) => {
      return { index: idx, name: element.contact?.name || 'Unknown Name' };
    });
  }
  return (
    <View style={styles.contactList}>
      <FlatList
        data={contacts}
        renderItem={({ item }: { item: Contacts }) => <Contact name={item.name} navigation={navigation} />}
        keyExtractor={(item) => item.index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactList: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ContactList;
