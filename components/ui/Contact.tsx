import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants';
import { getSessionTimeLeft } from '../../screens/ChatScreen';

export interface ContactProps {
  id: number;
  name: string;
  lastMessageAt: string;
  lastMessage: string;
  lastSessiontime: string;
}

const Contact: React.FC<ContactProps> = ({ id, name, lastMessageAt, lastMessage }) => {
  const navigation = useNavigation();

  const lastSessiontime = getSessionTimeLeft(lastMessageAt);

  const dateObj = new Date(lastMessageAt);
  const formattedTime = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <Pressable
      testID="contactCard"
      onPress={() => navigation.navigate('ChatScreen', { contact: { id, name, lastMessageAt } })}
      style={styles.item}
      android_ripple={{ color: COLORS.primary10 }}
    >
      <View style={styles.avatar}>
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

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.r22,
    flexDirection: 'row',
    height: SIZES.s44,
    justifyContent: 'center',
    width: SIZES.s44,
  },
  avatartext: {
    color: COLORS.primary400,
    fontSize: 18,
    fontWeight: '500',
  },
  item: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: 0.5,
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    height: SIZES.s70,
    paddingHorizontal: '4%',
    width: '100%',
  },
  lastMsg: {
    color: COLORS.mediumGray,
    marginLeft: SIZES.m18,
    width: '100%',
  },
  lastSession: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.lightGreen,
    color: COLORS.green20,
    fontWeight: 600,
  },
  lastTime: {
    alignItems: 'flex-end',
    color: COLORS.darkGray,
  },
  mainbody: {
    flexDirection: 'column',
    width: '60%',
  },
  name: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    fontWeight: 600,
    marginLeft: SIZES.m18,
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
    alignItems: 'flex-end',
    backgroundColor: COLORS.secondary100,
    color: COLORS.darkGray,
    fontWeight: 600,
  },
  timeComp: {
    alignItems: 'flex-end',
    flex: 3,
    flexDirection: 'column',
  },
});

export default Contact;
