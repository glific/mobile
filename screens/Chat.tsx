import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const variables = {
  filter: {},
  messageOpts: {
    limit: 3,
    offset: 0,
  },
  contactOpts: {
    limit: 10,
    offset: 0,
  },
};

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

  return (
    <View style={styles.mainContainer}>
      <ApolloProvider client={client}>
        <SearchBar />
        <ContactList navigation={navigation} variables={variables} />
      </ApolloProvider>
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
});

export default Chat;
