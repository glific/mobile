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
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    // Retrieve the values from AsyncStorage
    const getToken = async () => {
      const tokenValue = await Storage.getData("token");
      setToken(tokenValue);
    };

    getToken();
  }, []);

  const LogoutHandler = async () => {
    await Storage.removeData("token");
    await Storage.removeData("renewal_token");
    await Storage.removeData("token_expiry_time");
    setToken("");
    navigation.navigate("Login");
    // const getToken = async () => {
    //   const tokenValue = await Storage.getData("token");
    //   setToken(tokenValue);
    //   console.log("Token val-", tokenValue)
    // };
    // getToken();
  };

  return (
    <View>
      <Text>Chat Screen</Text>
      <Text>{token}</Text>
      <Button onPress={LogoutHandler}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default Chat;
