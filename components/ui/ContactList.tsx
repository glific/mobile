import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
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

const ContactList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CONTACTS, { variables });

  if (loading) {
    return <Loading />; // Display a loading indicator while the query is in progress
  }

  if (error) {
    console.log(error); // Handle the error
  }
  const contactItem = ({ item }: { item: Contacts }) => <Contact name={item.name} />;
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
        renderItem={contactItem}
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
