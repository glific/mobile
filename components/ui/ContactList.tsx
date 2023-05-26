import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import Contact from './Contact';
import Loading from './Loading';
import { GET_CONTACTS } from '../../graphql/queries/Contact';

interface ContactListProps {
  navigation: any;
}
export interface Contacts {
  id: number;
  name: string | null;
  LastMsg: string;
  LastTime: string;
  LastSession: string;
}

const variables = {
  filter: {},
  messageOpts: { limit: 3, offset: 0 },
  contactOpts: { limit: 10, offset: 0 },
};

const ContactList: React.FC<ContactListProps> = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_CONTACTS, { variables });
  const contactItem = ({ item }: { item: Contacts }) => (
    <Contact
      id={item.id}
      name={item.name}
      LastMsg={item.LastMsg}
      LastTime={item.LastTime}
      LastSession={item.LastSession}
      navigation={navigation}
    />
  );

  if (error) {
    console.log(error);
  }

  //let contacts = [];
  //dummy data
  let contacts = [
    {
      id: '1',
      name: 'Chandra',
      LastMsg: 'khbjvhckhjgvhc',
      LastTime: 'Yesterday',
      LastSession: '14hrs',
    },
    {
      id: '2',
      name: 'Abhishek',
      LastMsg: 'kjhjbghvfgciugfy',
      LastTime: '3:53 PM',
      LastSession: '24hrs',
    },
    {
      id: '3',
      name: 'Kunal',
      LastMsg: 'hiugfggufh',
      LastTime: 'Yesterday',
      LastSession: '18hrs',
    },
    {
      id: '4',
      name: 'Rahul',
      LastMsg: 'pioulikugjfhdt',
      LastTime: 'JAN 1',
      LastSession: '14hrs',
    },
    {
      id: '5',
      name: 'Khemu',
      LastMsg: 'uoiyujyfhdtug',
      LastTime: 'Yesterday',
      LastSession: '14hrs',
    },
    {
      id: '6',
      name: 'Michael',
      LastMsg: 'ikgjfhgd',
      LastTime: '5:45 AM',
      LastSession: '14hrs',
    },
  ];

  if (data) {
    contacts = data.search.map((element: any) => {
      return {
        id: element.contact?.id,
        name: element.contact?.name || element.contact?.maskedPhone,
      };
    });
  }

  return (
    <View style={styles.contactList}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={contactItem}
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
