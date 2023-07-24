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
    contactOpts: { limit: 10, offset: 0 },
  });
  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const { loading, error, data, refetch, fetchMore } = useQuery(GET_COLLECTIONS, {
    variables: searchVariable,
  });

  async function onSearchHandler() {
    refetch(searchVariable);
  }

  const handleSetSearchVariable = (variable) => {
    setPageNo(1);
    setNoMoreItems(false);
    setSearchVariable(variable);
  };

  useEffect(() => {
    if (error) console.log(error);
    if (!loading && data) {
      const newCollections: ChatEntry[] = data.search.map((element: unknown) => {
        return {
          id: element.group?.id,
          name: element.group?.label || 'Unknown Name',
        };
      });

      setCollections(newCollections);
    }
  }, [data, error]);

  const handleLoadMore = () => {
    if (loading || noMoreItems) return;

    fetchMore({
      variables: {
        filter: searchVariable.filter,
        messageOpts: searchVariable.messageOpts,
        contactOpts: { ...searchVariable.contactOpts, offset: pageNo * 10 },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.search?.length) {
          setNoMoreItems(true);
          return prev;
        } else {
          if (fetchMoreResult.search.length < 10) setNoMoreItems(true);
          setPageNo(pageNo + 1);
          return {
            search: [...prev.search, ...fetchMoreResult.search],
          };
        }
      },
    });
  };

  return (
    <>
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id + item.name}
        renderItem={({ item, index }) => (
          <CollectionCard key={index} id={item.id} name={item.name} />
        )}
        ListHeaderComponent={
          <SearchBar
            setSearchVariable={handleSetSearchVariable}
            onSearch={onSearchHandler}
            collectionTab
          />
        }
        ListEmptyComponent={() => !loading && <Text style={styles.emptyText}>No collection</Text>}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        style={styles.mainContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
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
