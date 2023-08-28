import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';

import Loading from '../components/ui/Loading';
import { COLORS, SCALE, SIZES } from '../constants';
import { RootStackParamList } from '../constants/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import {
  COUNT_COLLECTION_CONTACTS,
  GET_COLLECTION_INFO,
  GET_COLLECTION_MESSAGES_INFO,
} from '../graphql/queries/Collection';
import FieldValue from '../components/ui/FieldValue';

type Props = NativeStackScreenProps<RootStackParamList, 'CollectionProfile'>;
interface DescriptionProp {
  description: string;
  users: string[];
}

interface MessageCountProp {
  sessionMessages: number;
  onlyTemplates: number;
  noMessages: number;
}

const CollectionProfile = ({ navigation, route }: Props) => {
  const { collection } = route.params;
  const [contactCount, setcontactCount] = useState(0);
  const [collectionInfo, setCollectionInfo] = useState<DescriptionProp>({
    description: '',
    users: [],
  });
  const [messages, setMessages] = useState<MessageCountProp>({
    sessionMessages: 0,
    onlyTemplates: 0,
    noMessages: 0,
  });
  const countVariable = {
    filter: {
      includeGroups: collection.id,
    },
  };
  useQuery(COUNT_COLLECTION_CONTACTS, {
    variables: countVariable,
    onCompleted: (data) => {
      setcontactCount(data.countContacts);
    },
  });
  useQuery(GET_COLLECTION_MESSAGES_INFO, {
    variables: { id: collection.id },
    onCompleted: (data) => {
      const messageData = JSON.parse(data.groupInfo);
      const onlyTemplates = (messageData.session_and_hsm ?? 0) + (messageData.hsm ?? 0);
      const noMessages = messageData.none | 0;
      const sessionMessages = messageData.session_and_hsm | 0;
      setMessages({
        sessionMessages,
        onlyTemplates,
        noMessages,
      });
    },
  });
  const { loading } = useQuery(GET_COLLECTION_INFO, {
    variables: { id: collection.id },
    onCompleted: (data) => {
      const description = data.group.group.description;
      const users = data.group.group.users.map((user: { [key: string]: string }) => {
        return user.name;
      });
      setCollectionInfo({
        description,
        users,
      });
    },
  });
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.upperContainer}>
          <AntDesign
            testID="backIcon"
            name="arrowleft"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <Text testID={'sessionTimer'} style={styles.sessionText}>
            Number of Users: {contactCount}
          </Text>
        </View>
        <View style={styles.lowerContainer}>
          <View testID="userProfile" style={styles.avatar}>
            <Text style={styles.avatartext}>{collection.name.charAt(0)}</Text>
          </View>
          <Text testID="userName" style={styles.nameText} numberOfLines={1}>
            {collection.name}
          </Text>
        </View>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.bodyContainer}>
            <View style={styles.rowContainer}>
              <FieldValue
                field={'Description'}
                value={collectionInfo.description ? collectionInfo.description : 'No description'}
              />
            </View>
            <Text>Contacts qualified for:{'\n'}</Text>
            <View style={styles.rowContainer}>
              {/*TODO: Use Api to fetch */}
              <FieldValue field={'Session Messages:'} value={messages.sessionMessages} />
              <FieldValue field={'Only Templates:'} value={messages.onlyTemplates} />
            </View>
            <View style={styles.rowContainer}>
              {/*TODO: Use Api to fetch */}
              <FieldValue field={'No Messages:'} value={messages.noMessages} />
              <FieldValue
                field={'Assigned to'}
                value={
                  collectionInfo.users && collectionInfo.users.length > 0
                    ? collectionInfo.users.join(', ')
                    : 'None'
                }
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <Pressable
              style={styles.tabButton}
              onPress={() => navigation.navigate('CollectionContacts', { id: collection.id })}
              android_ripple={{ color: COLORS.black005 }}
            >
              <Text style={styles.tabButtonText}>View Contacts</Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default CollectionProfile;

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.m24,
    flexDirection: 'row',
    height: SIZES.s48,
    justifyContent: 'center',
    width: SIZES.s48,
  },
  avatartext: {
    color: COLORS.primary400,
    fontSize: SIZES.f18,
    fontWeight: '500',
    includeFontPadding: false,
  },
  backButton: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: SCALE(22),
    paddingRight: SIZES.m10,
  },
  bodyContainer: {
    marginTop: SIZES.m4,
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m20,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primary400,
    paddingHorizontal: SIZES.m16,
    width: '100%',
  },
  lowerContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: SIZES.m8,
    width: '100%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  nameText: {
    color: COLORS.white,
    fontSize: SIZES.f20,
    fontWeight: '500',
    letterSpacing: 1,
    marginLeft: SIZES.m10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sessionText: {
    color: COLORS.white,
    fontSize: SIZES.f12,
  },
  tabButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.m30,
    height: SIZES.s36,
    justifyContent: 'center',
    marginLeft: SIZES.m16,
    paddingHorizontal: SIZES.m16,
  },
  tabButtonText: {
    color: COLORS.primary400,
    fontSize: SIZES.f12,
    fontWeight: '500',
    includeFontPadding: false,
  },
  upperContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: SIZES.s50,
    justifyContent: 'space-between',
    width: '100%',
  },
});
