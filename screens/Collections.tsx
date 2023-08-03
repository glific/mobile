import React, { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import { COLORS, SIZES } from '../constants';
import Loading from '../components/ui/Loading';
import SearchBar from '../components/ui/SearchBar';
import CollectionCard from '../components/CollectionCard';
import { GET_COLLECTIONS } from '../graphql/queries/Collection';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const Collections = ({ navigation }: Props) => {
  const [searchVariable, setSearchVariable] = useState({
    filter: { searchGroup: true },
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10, offset: 0 },
  });
  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const {
    loading,
    refetch,
    fetchMore,
    data: collectionsData,
  } = useQuery(GET_COLLECTIONS, {
    variables: searchVariable,
    onError(error) {
      console.log(error);
    },
  });

  async function onSearchHandler() {
    refetch(searchVariable);
  }

  const handleSetSearchVariable = (variable) => {
    setPageNo(1);
    setNoMoreItems(false);
    setSearchVariable(variable);
  };

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
        accessibilityLabel={'notification-list'}
        data={collectionsData?.search}
        renderItem={({ item, index }) => {
          return (
            <CollectionCard
              key={index}
              id={item.group.id}
              name={item.group.label ? item.group.label : 'Unknown Name'}
              navigation={navigation}
            />
          );
        }}
        ListHeaderComponent={
          <SearchBar
            setSearchVariable={handleSetSearchVariable}
            onSearch={onSearchHandler}
            collectionTab
            navigation={navigation}
          />
        }
        ListEmptyComponent={!loading && <Text style={styles.emptyText}>No collection</Text>}
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
