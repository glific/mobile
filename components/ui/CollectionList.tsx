import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { GET_COLLECTIONS } from '../../graphql/queries/Collection';
import { useQuery } from '@apollo/client';

import Loading from './Loading';
import CollectionListItem from './CollectionListItem';

interface CollectionListProps {
  navigation: undefined;
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

const CollectionList: React.FC<CollectionListProps> = () => {
  const { loading, error, data } = useQuery(GET_COLLECTIONS, { variables });

  if (error) {
    console.log(error);
  }

  let collections = [];
  if (data) {
    collections = data.search.map((element: any) => {
      return { id: element.group?.id, name: element.group?.label || 'Unknown Name' };
    });
  }
  return (
    <View style={styles.collectionList}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={collections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CollectionListItem {...item} />}
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
