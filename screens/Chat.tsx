import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
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
  Chat: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

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
      <SearchBar />
      <ApolloProvider client={client}>
        <ContactList />
      </ApolloProvider>
      <Button onPress={LogoutHandler} disable={false}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default Chat;
