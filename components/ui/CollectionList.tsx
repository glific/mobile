import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { GET_COLLECTIONS } from '../../graphql/queries/Collection';
import { useQuery } from '@apollo/client';

import Contact from './Contact';
import Loading from './Loading';

export interface Contacts {
  index: number;
  name: string | null;
}

interface CollectionListProps {
  navigation: any;
}

const variables = {
  filter: { searchGroup: true },
  messageOpts: {
    limit: 3,
    offset: 0,
  },
  contactOpts: {
    limit: 10,
    offset: 0,
  },
};

const CollectionList: React.FC<CollectionListProps> = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_COLLECTIONS, { variables });

  if (error) {
    console.log(error);
  }

  const contactItem = ({ item }: { item: Contacts }) => (
    <Contact name={item.name} navigation={navigation} />
  );

  let collections = [];
  if (data) {
    collections = data.search.map((element: any, idx: number) => {
      return { index: idx, name: element.group?.label || 'Unknown Name' };
    });
  }
  return (
    <View style={styles.collectionList}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={collections}
          renderItem={contactItem}
          keyExtractor={(item) => item.index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  collectionList: {
    marginBottom: 20,
  },
});

export default CollectionList;
