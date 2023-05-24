import { Pressable, StyleSheet, Text, View } from 'react-native';
export interface ContactProps {
  name: string | null;
  navigation: any;
}

const Contact: React.FC<ContactProps> = ({ name, navigation }): JSX.Element => {
  return (
    <Pressable testID="Contact Card" onPress={() => navigation.navigate('ChatScreen')}>
      <View style={styles.item}>
        <View style={styles.avatar}>
          <Text style={styles.avatartext}>{name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F2F2F2',
    padding: 5,
    marginVertical: 1,
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 22,
    marginLeft: 18,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25.5,
    backgroundColor: '#a8ee90',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatartext: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 19,
    paddingTop: 12,
    fontSize: 18,
  },
});

export default Contact;
