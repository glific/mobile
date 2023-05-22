import { Text, View } from "react-native";
import Storage from "../utils/asyncStorage";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { client } from "../config/apollo.config";
import ContactList from "../components/ui/ContactList";
import SearchBar from "../components/ui/SearchBar";

type RootStackParamList = {
  Login: undefined;
  Chat: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const Chat = ({ navigation }: Props) => {
  const [session, setSession] = useState<object | null>({});
  const authLink = new ApolloLink((operation, forward) => {
    // Add the headers to the operation
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: session['access_token'],
      },
    }));

    return forward(operation);
  });
  const modifiedLink = authLink.concat(client.link);
  const newClient = new ApolloClient({
    link: modifiedLink,
    cache: new InMemoryCache(),
  })
  useEffect(() => {
    // Retrieve the session from AsyncStorage
    const getSession = async () => {
      const sessionValue = await Storage.getData("session");
      if (sessionValue !== null) {
        const parsedSessionValue = JSON.parse(sessionValue);
        setSession(parsedSessionValue);
      }
    };
    getSession();
  }, []);

  const LogoutHandler = async () => {
    await Storage.removeData("session");
    setSession({});
    navigation.navigate("Login");
  };

  return (
    <View>
      <SearchBar />
      <ApolloProvider client={newClient}>
        <ContactList />
      </ApolloProvider>
      <Button onPress={LogoutHandler} disable={false} />
    </View>
  );
};

export default Chat;
