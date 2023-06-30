import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import formatTime from '../utils/formatTime';
import { COLORS, SCALE, SIZES } from '../constants';
import { getSessionTimeLeft } from '../utils/helper';

export interface ContactProps {
  id: string;
  name: string;
  lastMessageAt: string;
  lastMessage: string | undefined;
}

const Contact: React.FC<ContactProps> = ({ id, name, lastMessageAt, lastMessage }) => {
  const navigation = useNavigation();

  const lastSessiontime = getSessionTimeLeft(lastMessageAt);
  const dateObj = new Date(lastMessageAt);
  const formattedTime = formatTime(dateObj);

  return (
    <Pressable
      testID="contactCard"
      onPress={() =>
        navigation.navigate('ChatScreen', {
          id: id,
          displayName: name,
          conversationType: 'contact',
          lastMessageAt: lastMessageAt,
        })
      }
      style={styles.item}
      android_ripple={{ color: COLORS.primary10 }}
    >
      <View style={styles.avatar}>
        <View style={styles.onlineIndicator} />
        <Text style={styles.avatartext}>{name.charAt(0)}</Text>
      </View>
      <View style={styles.mainbody}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lastMsg} numberOfLines={1}>
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
    backgroundColor: COLORS.lightGreen,
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

  sessionBorder: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
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
