import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { useQuery } from '@apollo/client';
import { GET_CONTACT_HISTORY } from '../../graphql/queries/ContactHistory';
import LoadingPage from '../../components/ui/Loading';

const ContactHistoryScreen = ({ navigation, route }: Props) => {
  const { contact } = route.params;
  const variables = {
    filter: {
      contactId: contact.id,
    },
    opts: {
      limit: 10,
      offset: 0,
      order: 'DESC',
    },
  };
  const { loading, data } = useQuery(GET_CONTACT_HISTORY, { variables });
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headContainer}>
        <AntDesign
          testID="backButton"
          name="arrowleft"
          style={styles.backButton}
          onPress={(): void => navigation.goBack()}
        />
        <Text style={{ color: COLORS.white }}>Contact history</Text>
      </View>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {data.contactHistory ? (
            <>
              <View style={styles.mainListContainer}>
                {data.contactHistory.map((item) => (
                  <View key={item.id} style={styles.subContainer}>
                    <Text style={styles.text} testID='eventLabel'>
                      {item.eventLabel} {}
                    </Text>
                    <Text style={styles.textTime}>{item.eventDatetime}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <Text style={styles.text}>No contact history</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default ContactHistoryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primary400,
    flexDirection: 'row',
    height: 60,
    padding: '2%',
    width: '100%',
    zIndex: 50,
  },
  mainListContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.m10,
  },
  subContainer: {
    margin: 7,
    flexDirection: 'column',
    width: '80%',
    backgroundColor: '#E2E2E2',
    padding: 20,
    borderRadius: SIZES.r10,
  },
  text: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: SIZES.f14,
  },
  textTime: {
    color: COLORS.black,
    fontWeight: '500',
    fontSize: SIZES.f14,
  },
  backButton: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: 22,
    paddingHorizontal: 10,
  },
  nameText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
    marginLeft: 10,
  },
});
