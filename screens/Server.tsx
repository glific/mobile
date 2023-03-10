import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Colors } from "../constants/styles";
import { validateUrl } from "../utils/helper";

type RootStackParamList = {
  Server: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Server">;

const Server = ({ navigation }: Props) => {
  const [serverURL, setServerURL] = useState("https://glific.test");
  const [errorMessage, setErrorMessage] = useState("");

  const serverURLChanged = (value: string) => {
    setServerURL(value);
    setErrorMessage("");
  };

  const onSubmitHandler = () => {
    if (!serverURL || !validateUrl(serverURL)) {
      setErrorMessage("Please enter valid server url");
      return;
    }

    // navigate to next page
    navigation.navigate("Login");
  };

  let errorDisplay;
  if (errorMessage) {
    errorDisplay = <Text style={styles.errorLabel}>{errorMessage}</Text>;
  }

  return (
    <View>
      <Input
        label="Server URL"
        onUpdateValue={serverURLChanged}
        value={serverURL}
        isError={errorMessage ? true : false}
        keyboardType="url"
      />
      {errorDisplay}
      <Button onPress={onSubmitHandler}>
        <Text>Continue</Text>
      </Button>
    </View>
  );
};

export default Server;

const styles = StyleSheet.create({
  errorLabel: {
    color: Colors.error100,
  },
});
