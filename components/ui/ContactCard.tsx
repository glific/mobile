import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SCALE, SIZES } from '../../constants';
import { getSessionTimeLeft } from '../../screens/ChatScreen';

export interface ContactProps {
  id: string;
  name: string;
  lastMessageAt: string;
  lastMessage: string | undefined;
}

function formatTime(dateObj: Date) {
  const currentTime = new Date();
  const timeDifference = currentTime - dateObj;

  // Less than 30 minutes
  if (timeDifference < 30 * 60 * 1000) {
    const minutes = Math.floor(timeDifference / (60 * 1000));
    return `${minutes} mins`;
  }

  // More than 30 minutes from current
  if (timeDifference > 30 * 60 * 1000 && timeDifference < 24 * 60 * 60 * 1000) {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return dateObj.toLocaleString('en-US', options);
  }

  // Yesterday
  const yesterday = new Date(currentTime);
  yesterday.setDate(currentTime.getDate() - 1);
  if (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday';
  }

  // Date format (6 Jun)
  const options = { day: 'numeric', month: 'short' };
  const formattedDate = dateObj.toLocaleString('en-US', options);
  return formattedDate;
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
          contact: { id, name, lastMessageAt },
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
