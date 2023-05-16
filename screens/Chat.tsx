import { StyleSheet, Text, View } from "react-native";
import Storage from "../utils/asyncStorage";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Chat: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const Chat = ({ navigation }: Props) => {
  const [session, setSession] = useState<object | null>({});

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
      <Text>Chat Screen</Text>
      <Button onPress={LogoutHandler}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default Chat;
