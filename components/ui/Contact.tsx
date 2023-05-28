import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants';

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
  avatar: {
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: COLORS.primary10,
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
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: '4%',
    width: '100%',
  },
  lastMsg: {
    color: '#49454F',
    marginLeft: 18,
    width: '100%',
  },
  lastSession: {
    alignItems: 'flex-end',
    backgroundColor: '#ECF7F1',
    color: '#073F24',
    fontWeight: 600,
  },
  lastTime: {
    alignItems: 'flex-end',
    color: '#93A29B',
  },
  mainbody: {
    flexDirection: 'column',
    width: '60%',
  },
  name: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 18,
  },

  sessionBorder: {
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#ECF7F1',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    height: 25,
    width: 44,
  },
  sessionInvalid: {
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    height: 25,
    width: 44,
  },
  timeComp: {
    alignItems: 'flex-end',
    flex: 3,
    flexDirection: 'column',
  },

  textInvalid: {
    alignItems: 'flex-end',
    backgroundColor: '#F2F2F2',
    color: '#93A29B',
    fontWeight: 600,
  },
});

export default Contact;
