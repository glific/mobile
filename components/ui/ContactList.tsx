import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import Contact from './Contact';
import Loading from './Loading';
import { GET_CONTACTS } from '../../graphql/queries/Contact';

interface ContactListProps {
  navigation: any;
}

const variables = {
  filter: {},
  messageOpts: { limit: 3, offset: 0 },
  contactOpts: { limit: 10, offset: 0 },
};

const ContactList: React.FC<ContactListProps> = () => {
  const { loading, error, data } = useQuery(GET_CONTACTS, { variables });

  if (error) {
    console.log(error);
  }

  let contacts = [];
  if (data) {
    contacts = data.search.map((element: any) => {
      const Messages = element.messages;
      return {
        id: element.contact?.id,
        name: element.contact?.name || element.contact?.maskedPhone,
        lastMessageAt: element.contact?.lastMessageAt,
        lastMessage: Messages[Messages.length - 1]?.body,
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Contact {...item} />}
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
