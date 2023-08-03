import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import formatTime from '../utils/formatTime';
import { COLORS, SCALE, SIZES } from '../constants';
import { getSessionTimeLeft } from '../utils/helper';
import { MARK_AS_READ, CONTACT_FRAGMENT } from '../graphql/mutations/Chat';
import { useApolloClient, useMutation } from '@apollo/client';
import { RootStackParamList } from '../constants/types';

export interface ContactProps {
  id: string;
  name: string;
  lastMessageAt: string;
  lastMessage: string | undefined;
  isOrgRead: boolean;
  navigation: NavigationProp<RootStackParamList>;
}

const updateContactCache = (client: any, id: any) => {
  const contact = client.readFragment({
    id: `Contact:${id}`,
    fragment: CONTACT_FRAGMENT,
  });
  if (contact) {
    client.writeFragment({
      id: `Contact:${id}`,
      fragment: CONTACT_FRAGMENT,
      data: { ...contact, isOrgRead: true },
    });
  }

  return null;
};

const Contact: React.FC<ContactProps> = ({
  id,
  name,
  lastMessageAt,
  lastMessage,
  isOrgRead,
  navigation,
}) => {
  const lastSessiontime = getSessionTimeLeft(lastMessageAt);
  const dateObj = new Date(lastMessageAt);
  const formattedTime = formatTime(dateObj);

  const client = useApolloClient();
  const [markAsRead] = useMutation(MARK_AS_READ, {
    onCompleted: (data) => {
      if (data.markContactMessagesAsRead) {
        updateContactCache(client, id);
      }
    },
  });

  return (
    <Pressable
      testID={`contactCard${id}`}
      onPress={() => {
        markAsRead({ variables: { contactId: id } });
        navigation.navigate('ChatScreen', {
          id: id,
          displayName: name,
          conversationType: 'contact',
          lastMessageAt: lastMessageAt,
        });
      }}
      style={styles.item}
      android_ripple={{ color: COLORS.primary10 }}
    >
      <View style={styles.avatar}>
        <View style={[styles.onlineIndicator, isOrgRead && styles.offlineIndicator]} />
        <Text style={styles.avatartext}>{name.charAt(0)}</Text>
      </View>
      <View style={styles.mainbody}>
        <Text style={[styles.name, isOrgRead && styles.readName]}>{name}</Text>
        <Text style={[styles.lastMsg, isOrgRead && styles.readName]} numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>
      <View style={styles.timeComp}>
        <Text style={styles.lastTime} numberOfLines={1}>
          {formattedTime}
        </Text>
        <View style={lastSessiontime ? styles.sessionBorder : styles.sessionInvalid}>
          <Text style={lastSessiontime ? styles.lastSession : styles.textInvalid}>
            {lastSessiontime}hrs
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Contact;

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.r22,
    flexDirection: 'row',
    height: SIZES.s44,
    justifyContent: 'center',
    width: SIZES.s44,
  },
  avatartext: {
    color: COLORS.primary400,
    fontSize: SIZES.f18,
    fontWeight: '500',
    includeFontPadding: false,
  },
  item: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: SCALE(0.25),
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    height: SIZES.s70,
    paddingHorizontal: '4%',
    width: '100%',
  },
  lastMsg: {
    color: COLORS.mediumGray,
    fontSize: SIZES.f14,
    marginLeft: SIZES.m18,
    width: '100%',
  },
  lastSession: {
    color: COLORS.primary100,
    fontSize: SIZES.f12,
    fontWeight: '600',
    includeFontPadding: false,
  },
  lastTime: {
    alignItems: 'flex-end',
    color: COLORS.darkGray,
    fontSize: SIZES.f12,
  },
  mainbody: {
    flexDirection: 'column',
    width: '60%',
  },
  name: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    fontWeight: '600',
    marginLeft: SIZES.m16,
  },
  offlineIndicator: {
    backgroundColor: COLORS.darkGray,
  },
  onlineIndicator: {
    backgroundColor: COLORS.primary100,
    borderColor: COLORS.white,
    borderRadius: SCALE(8),
    borderWidth: SCALE(2),
    height: SIZES.f14,
    position: 'absolute',
    right: -SIZES.m4,
    top: -0,
    width: SIZES.f14,
  },
  readName: {
    color: COLORS.darkGray,
  },
  sessionBorder: {
    alignItems: 'center',
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.r14,
    flexDirection: 'row',
    height: SIZES.s24,
    justifyContent: 'center',
    marginTop: SIZES.m4,
    width: SIZES.s44,
  },
  sessionInvalid: {
    alignItems: 'center',
    backgroundColor: COLORS.secondary100,
    borderRadius: SIZES.r14,
    flexDirection: 'row',
    height: SIZES.s24,
    justifyContent: 'center',
    marginTop: SIZES.m4,
    width: SIZES.s44,
  },
  textInvalid: {
    backgroundColor: COLORS.secondary100,
    color: COLORS.darkGray,
    fontSize: SIZES.f12,
    fontWeight: '600',
    includeFontPadding: false,
  },
  timeComp: {
    alignItems: 'flex-end',
    flex: 3,
  },
});
