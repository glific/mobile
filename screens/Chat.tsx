import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';

import { ApolloProvider } from '@apollo/client';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ContactList from '../components/ui/ContactList';
import SearchBar from '../components/ui/SearchBar';
import Storage from '../utils/asyncStorage';
import Button from '../components/ui/Button';
import { client } from '../config/apollo';
import AuthContext from '../config/AuthContext';

type RootStackParamList = {
  Login: undefined;
  Contacts: undefined;
  ChatScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;
type ItemProps = { name: string };

//Dummy data
const DATA = [
  {
    id: '1',
    name: 'Chandra',
  },
  {
    id: '2',
    name: 'Abhishek',
  },
  {
    id: '3',
    name: 'Kunal',
  },
  {
    id: '4',
    name: 'Rahul',
  },
  {
    id: '5',
    name: 'Khemu',
  },
  {
    id: '6',
    name: 'Michael',
  },
];

const Chat = ({ navigation }: Props) => {
  const { setToken } = useContext(AuthContext);
  const [session, setSession] = useState<object | null>();

  useEffect(() => {
    // Retrieve the session from AsyncStorage
    const getSession = async () => {
      const sessionValue = await Storage.getData('session');
      if (sessionValue !== null) {
        const parsedSessionValue = JSON.parse(sessionValue);
        setSession(parsedSessionValue);
      }
    };
    getSession();
  }, []);

  const LogoutHandler = async () => {
    await Storage.removeData('session');
    setSession({});
    setToken(null);
  };
  const Item = ({ name }: ItemProps) => (
    <Pressable onPress={() => navigation.navigate('ChatScreen')}>
      <View style={styles.item}>
        <View style={styles.avatar}>
          <Text style={styles.avatartext}>{name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.mainContainer}>
      <SearchBar />
      <ApolloProvider client={client}>
        <ContactList />
      </ApolloProvider>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item name={item.name} />}
        keyExtractor={(item) => item.id}
      />
      <View style={{ marginTop: 15 }}>
        <Button onPress={LogoutHandler}>
          <Text>Logout</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
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

export default Chat;
