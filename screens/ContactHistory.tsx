import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import moment from 'moment';

import { COLORS, SIZES } from '../constants';
import Loading from '../components/ui/Loading';
import LoadMoreFooter from '../components/ui/LoadMoreFooter';
import { GET_CONTACT_HISTORY } from '../graphql/queries/Contact';

type HistoryType = {
  id: string;
  date: number;
  action: string;
};

const formatHistory = (history): HistoryType => {
  let flow = '';
  if (history.eventLabel === 'Flow Started') {
    flow = JSON.parse(history.eventMeta).flow.name;
  }
  const action = flow ? `${history.eventLabel}: ${flow}` : history.eventLabel;

  return {
    id: history.id,
    date: moment.utc(history.eventDatetime).valueOf(),
    action: action,
  };
};

const formatDate = (date: number) => {
  const givenDate = new Date(date);
  return moment(givenDate).format('DD/MM/YYYY, HH:mm:ss');
};

interface Props {
  route: {
    params: {
      id: string;
    };
  };
}

const ContactHistory = ({ route }: Props) => {
  const { id: contactId } = route.params;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const historyVariables = {
    opts: {
      limit: 10,
      offset: 0,
      order: 'DESC',
    },
    filter: {
      contactId: contactId,
    },
  };

  const { loading, fetchMore, data } = useQuery(GET_CONTACT_HISTORY, {
    variables: historyVariables,
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleLoadMore = () => {
    if (loading || isLoadingMore || noMoreItems) return;
    setIsLoadingMore(true);
    fetchMore({
      variables: {
        filter: historyVariables.filter,
        opts: {
          ...historyVariables.opts,
          offset: data?.contactHistory.length,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.contactHistory.length === 0) {
          // If there are no more items, set noMoreItems to true
          setNoMoreItems(true);
          return prev;
        }
        if (fetchMoreResult.contactHistory.length < 10) setNoMoreItems(true);
        setIsLoadingMore(false);
        // Append new data to the existing data
        return { contactHistory: [...prev.contactHistory, ...fetchMoreResult.contactHistory] };
      },
    });
  };

  const renderItem = ({ item }) => {
    const history = formatHistory(item);
    return (
      <View key={history.id} style={styles.historyContainer}>
        <Text>{history.action}</Text>
        <Text>{formatDate(history.date)}</Text>
      </View>
    );
  };

  return (
    <>
      <FlatList
        accessibilityLabel={'history-list'}
        style={styles.mainContainer}
        data={data?.contactHistory}
        ListEmptyComponent={<>{!loading && <Text style={styles.placeholder}>No History</Text>}</>}
        ListFooterComponent={<LoadMoreFooter loadingMore={isLoadingMore && !noMoreItems} />}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {loading && <Loading />}
    </>
  );
};

export default ContactHistory;

const styles = StyleSheet.create({
  historyContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.r10,
    marginTop: SIZES.m18,
    padding: SIZES.m10,
    width: SIZES.s328,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  placeholder: {
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    paddingVertical: SIZES.m24,
    textAlign: 'center',
  },
});
