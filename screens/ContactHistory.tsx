import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { COLORS, SIZES } from '../constants';
import { Feather } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    date: '2023-07-19T03:22:11.442Z',
    action: 'Flow Started: Registration Workflow',
  },
  {
    id: '2',
    date: '2023-07-19T03:22:11.442Z',
    action: 'Added to collection: "Optin contacts"',
  },
  {
    id: '3',
    date: '2023-07-19T03:22:11.442Z',
    action: 'Changed contact language to English',
  },
  {
    id: '4',
    date: '2023-07-19T03:22:11.442Z',
    action: 'Flow Started: Optin Workflow',
  },
];

const formatDate = (date: string) => {
  const givenDate = new Date(date);
  return moment(givenDate).format('DD/MM/YYYY, HH:mm:ss');
};

const ContactHistory = () => {
  return (
    <>
      <FlatList
        style={styles.mainContainer}
        data={data}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.historyContainer}>
            <Text>{item.action}</Text>
            <Text>{formatDate(item.date)}</Text>
          </View>
        )}
      />
      <Pressable onPress={() => console.log('Load more')} style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>Load More</Text>
        <Feather name="chevron-down" size={SIZES.s20} color={COLORS.primary400} />
      </Pressable>
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
