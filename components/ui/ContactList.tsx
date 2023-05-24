import React from 'react';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import { GET_CONTACTS } from '../../graphql/queries/Contact';
import { useQuery } from '@apollo/client';

import Contact from './Contact';
import Loading from './Loading';

export interface Contacts {
  index: number;
  name: string | null;
  last_msg: string;
  last_time: string;
  last_session: string;
}

interface ContactListProps {
  navigation: any;
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

const ContactList: React.FC<ContactListProps> = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_CONTACTS, { variables });

  if (error) {
    console.log(error);
  }

  const contactItem = ({ item }: { item: Contacts }) => (

    <Contact
      name={item.name}
      last_msg={item.last_msg}
      last_time={item.last_time}
      last_session={item.last_session}
      navigation={navigation}
    />

  );

  let contacts = [
    {
      index: '1',
      name: 'Chandra',
      last_msg: 'khbjvhckhjgvhc',
      last_time: 'Yesterday',
      last_session: '14hrs',
    },
    {
      index: '2',
      name: 'Abhishek',
      last_msg: 'kjhjbghvfgciugfy',
      last_time: '3:53 PM',
      last_session: '24hrs',
    },
    {
      index: '3',
      name: 'Kunal',
      last_msg: 'hiugfggufh',
      last_time: 'Yesterday',
      last_session: '18hrs',
    },
    {
      index: '4',
      name: 'Rahul',
      last_msg: 'pioulikugjfhdt',
      last_time: 'JAN 1',
      last_session: '14hrs',
    },
    {
      index: '5',
      name: 'Khemu',
      last_msg: 'uoiyujyfhdtug',
      last_time: 'Yesterday',
      last_session: '14hrs',
    },
    {
      index: '6',
      name: 'Michael',
      last_msg: 'ikgjfhgd',
      last_time: '5:45 AM',
      last_session: '14hrs',
    },
  ];
  if (data) {

    contacts = data.search.map((element: any, index: number) => ({
      index,
      name: element.contact?.name || element.contact?.maskedPhone,
    }));

  }
  return (
    <View style={styles.contactList}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={contacts}
          renderItem={contactItem}
          keyExtractor={(item) => item.index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contactList: {
    flex: 1,
    marginBottom: 20,
  },
});

export default ContactList;
