import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { COLORS, SIZES } from '../constants';
import { Feather } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import { COUNT_CONTACT_HISTORY, GET_CONTACT_HISTORY } from '../graphql/queries/Contact';
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
  navigation: unknown;
  route: {
    params: {
      id: string;
    };
  };
}

const ContactHistory = ({ navigation, route }: Props) => {
  const contactId = route.params;
  const [historyData, setHistoryData] = useState([]);
  const [numHistory, setNumHistory] = useState(10);
  const [totalHistoryCount, setTotalHistoryCount] = useState(0);

  useQuery(COUNT_CONTACT_HISTORY, {
    variables: {
      filter: {
        contactId: contactId,
      },
    },
    onCompleted: (data) => {
      setTotalHistoryCount(data.countContactHistory);
    },
  });
  const { loading } = useQuery(GET_CONTACT_HISTORY, {
    variables: {
      opts: {
        order: 'ASC',
        limit: numHistory,
        offset: 0,
      },
      filter: {
        contactId: contactId,
      },
    },
    onCompleted: (data) => {
      const formattedHistory = formatHistory(data.contactHistory);
      setHistoryData(formattedHistory);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return (
    <>
      <FlatList
        style={styles.mainContainer}
        data={historyData}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.historyContainer}>
            <Text>{item.action}</Text>
            <Text>{formatDate(item.date)}</Text>
          </View>
        )}
      />
      {numHistory < totalHistoryCount ? (
        <Pressable onPress={() => setNumHistory(numHistory + 10)} style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More</Text>
          <Feather name="chevron-down" size={SIZES.s20} color={COLORS.primary400} />
        </Pressable>
      ) : null}
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
    marginTop: SIZES.m16,
    padding: SIZES.m10,
    width: SIZES.s328,
  },
  loadMoreButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.r20,
    bottom: 0,
    flexDirection: 'row',
    height: SIZES.m35,
    justifyContent: 'center',
    marginBottom: SIZES.m24,
    paddingHorizontal: SIZES.m16,
    position: 'absolute',
  },
  loadMoreText: {
    color: COLORS.primary400,
    fontSize: SIZES.f14,
    fontWeight: '500',
    includeFontPadding: false,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
