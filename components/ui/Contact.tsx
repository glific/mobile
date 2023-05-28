import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants';

export interface ContactProps {
  id: number;
  name: string;
  lastMessageAt: string;
  lastSessiontime: any;
}

const Contact: React.FC<ContactProps> = ({ id, name, lastMessageAt, Messages }) => {
  const navigation = useNavigation();

  if (!Messages) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  const temp = Messages[Messages.length - 1];
  if (!temp) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  const getSessionTimeLeft = (time) => {
    const currentTime = new Date();
    const lastMessageTime = new Date(time);
    const timeDifference = lastMessageTime.getTime() + 24 * 60 * 60 * 1000 - currentTime.getTime();
    let hours = Math.max(Math.ceil(timeDifference / (1000 * 60 * 60)), 0);
    hours = Math.min(hours, 24);
    return hours;
  };

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
          {temp.body}
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
    borderRadius: 22,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    width: 44,
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
    height: 70,
    paddingHorizontal: '4%',
    width: '100%',
  },
  lastMsg: {
    color: COLORS.mediumGray,
    marginLeft: 18,
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
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 18,
  },

  sessionBorder: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    borderRadius: 14,
    flexDirection: 'row',
    height: 25,
    justifyContent: 'center',
    marginTop: 5,
    width: 44,
  },
  sessionInvalid: {
    alignItems: 'center',
    backgroundColor: COLORS.secondary100,
    borderRadius: 14,
    flexDirection: 'row',
    height: 25,
    justifyContent: 'center',
    marginTop: 5,
    width: 44,
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
