import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants';
import getSessionTimeLeft from '../../screens/ChatScreen';
export interface ContactProps {
  id: number;
  name: string;
  lastMessageAt: string;
  Messages: [
    {
      id: number;
      body: string;
    }
  ];
  lastSessiontime: string;
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

  let temp = Messages[Messages.length - 1];
  if (!temp) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  const getSessionTimeLeft = (time: string) => {
    const currentTime = new Date();
    const lastMessageTime = new Date(time);
    const timeDifference = lastMessageTime.getTime() + 24 * 60 * 60 * 1000 - currentTime.getTime();
    let hours = Math.max(Math.ceil(timeDifference / (1000 * 60 * 60)), 0);
    hours = Math.min(hours, 24);
    return hours;
  };

  let lastSessiontime = getSessionTimeLeft(lastMessageAt);

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
  item: {
    width: '100%',
    height: 70,
    paddingHorizontal: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: COLORS.darkGray,
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 18,
    color: '#212121',
  },
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatartext: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.primary400,
  },
  mainbody: {
    flexDirection: 'column',
    width: '60%',
  },
  timeComp: {
    flexDirection: 'column',
    flex: 3,
    alignItems: 'flex-end',
  },
  lastMsg: {
    marginLeft: 18,
    color: '#49454F',
    width: '100%',
  },
  lastTime: { color: '#93A29B', alignItems: 'flex-end' },
  sessionBorder: {
    height: 25,
    width: 44,
    borderRadius: 14,
    backgroundColor: '#ECF7F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  sessionInvalid: {
    height: 25,
    width: 44,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  textInvalid: {
    backgroundColor: '#F2F2F2',
    color: '#93A29B',
    fontWeight: 600,

    alignItems: 'flex-end',
  },

  lastSession: {
    alignItems: 'flex-end',
    color: '#073F24',
    fontWeight: 600,

    backgroundColor: '#ECF7F1',
  },
});

export default Contact;
