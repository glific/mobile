import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants';
export interface ContactProps {
  name: string | null;
  navigation: any;
}

const Contact: React.FC<ContactProps> = ({ name, navigation }): JSX.Element => {
  return (
    <Pressable
      testID="contactCard"
      onPress={() => navigation.navigate('ChatScreen')}
      style={styles.item}
      android_ripple={{ color: COLORS.primary10 }}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatartext}>{name.charAt(0)}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
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
    borderColor: COLORS.darkGray,
  },
  name: {
    fontSize: 16,
    marginLeft: 18,
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
});

export default Contact;
