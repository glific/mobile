import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import SearchBar from '../components/ui/SearchBar';
import { GET_COLLECTIONS } from '../graphql/queries/Collection';
import CollectionCard from '../components/CollectionCard';
import { COLORS, SIZES } from '../constants';
import { ChatEntry } from '../constants/types';
import Loading from '../components/ui/Loading';

const Collections = () => {
  const [collections, setCollections] = useState<ChatEntry[]>([]);
  const [searchVariable, setSearchVariable] = useState({
    filter: { searchGroup: true },
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10 },
  });

  const { loading, error, data, refetch } = useQuery(GET_COLLECTIONS, {
    variables: searchVariable,
  });

  async function onSearchHandler() {
    refetch(searchVariable);
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      const newCollections: ChatEntry[] = data.search.map((element: any) => {
        return {
          id: element.group?.id,
          name: element.group?.label || 'Unknown Name',
        };
      });

      setCollections(newCollections);
    }
  }, [data, error]);

  return (
    <>
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CollectionCard id={item.id} name={item.name} />}
        ListHeaderComponent={
          <SearchBar
            setSearchVariable={setSearchVariable}
            onSearch={onSearchHandler}
            collectionTab
          />
        }
        ListEmptyComponent={() => !loading && <Text style={styles.emptyText}>No collection</Text>}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        style={styles.mainContainer}
      />
      {loading && <Loading />}
    </>
  );
};

export default Collections;

const styles = StyleSheet.create({
  emptyText: {
    alignSelf: 'center',
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginTop: SIZES.m16,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
