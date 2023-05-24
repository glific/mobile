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

  if (error) {
    console.log(error);
  }

<<<<<<< HEAD
  const contactItem = ({ item }: { item: Contacts }) => (
    <Contact name={item.name} navigation={navigation} />
  );

=======
>>>>>>> 66a3b99daa1b9775295c354b7aeb965a12e740d4
  let contacts = [];
  if (data) {
    contacts = data.search.map((element: any, idx: number) => {
      return { index: idx, name: element.contact?.name || 'Unknown Name' };
    });
  }
  return (
    <View style={styles.contactList}>
<<<<<<< HEAD
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={contacts}
          renderItem={contactItem}
          keyExtractor={(item) => item.index.toString()}
        />
      )}
=======
      <FlatList
        data={contacts}
        renderItem={({ item }: { item: Contacts }) => <Contact name={item.name} navigation={navigation} />}
        keyExtractor={(item) => item.index.toString()}
      />
>>>>>>> 66a3b99daa1b9775295c354b7aeb965a12e740d4
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
