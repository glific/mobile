import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { COLORS, SIZES } from '../constants';
import { useQuery } from '@apollo/client';
import { GET_CONTACT_HISTORY } from '../graphql/queries/Contact';
import Loading from '../components/ui/Loading';

type History = {
  id: string;
  date: string;
  action: string;
};

const formatDate = (date: string) => {
  const givenDate = new Date(date);
  return moment(givenDate).format('DD/MM/YYYY, HH:mm:ss');
};

const formatHistory = (histories): History[] => {
  return histories.map((history) => {
    let flow = '';
    if (history.eventLabel === 'Flow Started') {
      flow = JSON.parse(history.eventMeta).flow.name;
    }
    return {
      id: history.id,
      date: moment.utc(history.eventDatetime).valueOf(),
      action: `${history.eventLabel}${flow ? `: ${flow}` : ''}`,
    };
  });
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
  const [historyData, setHistoryData] = useState([]);
  const [noMoreItems, setNoMoreItems] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const historyVariables = {
    opts: {
      order: 'ASC',
      limit: 10,
      offset: 0,
    },
    filter: {
      contactId: contactId,
    },
  };

  const { loading, fetchMore } = useQuery(GET_CONTACT_HISTORY, {
    variables: historyVariables,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const formattedHistory = formatHistory(data.contactHistory);
      setHistoryData(formattedHistory);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleLoadMore = () => {
    if (loading || noMoreItems) return;
    fetchMore({
      variables: {
        ...historyVariables,
        opts: {
          ...historyVariables.opts,
          offset: pageNo * 10 + 1,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.contactHistory.length === 0) {
          // If there are no more items, set noMoreItems to true
          setNoMoreItems(true);
          return prev;
        }
        if (fetchMoreResult.contactHistory.length < 10) setNoMoreItems(true);
        setPageNo(pageNo + 1);
        // Append new data to the existing data
        return { contactHistory: [...prev.contactHistory, ...fetchMoreResult.contactHistory] };
      },
    });
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.historyContainer}>
      <Text>{item.action}</Text>
      <Text>{formatDate(item.date)}</Text>
    </View>
  );

  return (
    <>
      {historyData.length > 0 ? (
        <FlatList
          accessibilityLabel={'history-list'}
          testID="historyFlatList"
          style={styles.mainContainer}
          data={historyData}
          ListEmptyComponent={
            !loading ? <Text style={styles.placeholder}>No History Available</Text> : null
          }
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <Text style={styles.placeholder}>{!loading ? ' No History Available' : ''}</Text>
      )}
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
