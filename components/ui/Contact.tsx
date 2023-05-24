import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/styles';
export interface ContactProps {
  name: string | null;
  last_msg: string;
  last_time: string;
  last_session: string;
  navigation: any;
}

const Contact: React.FC<ContactProps> = ({
  name,
  last_msg,
  last_time,
  last_session,
  navigation,
}): JSX.Element => {
  return (
    <Pressable
      testID="contactCard"
      onPress={() => navigation.navigate('ChatScreen')}
      style={styles.item}
      android_ripple={{ color: Colors.primary10 }}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatartext}>{name.charAt(0)}</Text>
      </View>

      <View style={styles.mainbody}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.lastMsg}>{last_msg}</Text>
      </View>
      <View style={styles.timecomp}>
        <Text style={styles.lastTime}>{last_time}</Text>
        <View style={styles.sessionBorder}>
          <Text style={styles.lastSession}>{last_session}</Text>
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
    borderWidth: 0.5,
    borderColor: Colors.darkGray,
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
    backgroundColor: Colors.primary10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatartext: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primary400,

  },
  mainbody: {
    flexDirection: 'column',
  },
  timecomp: {
    flexDirection: 'column',
    flex: 3,
    alignItems: 'flex-end',
  },
  lastMsg: {
    marginLeft: 18,
    color: '#49454F',
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
  lastSession: {
    alignItems: 'flex-end',
    color: '#073F24',
    fontWeight: 500,

    backgroundColor: '#ECF7F1',

  },
});

export default Contact;
