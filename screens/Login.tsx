import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import Input from "../components/ui/Input";
import { Colors } from "../constants/styles";
import createAxiosClient from "../constants/API";

type RootStackParamList = {
  Login: undefined;
  Chat: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: Props) => {
  const [enteredMobile, setEnteredMobile] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const Client = createAxiosClient();

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case "mobile":
        setEnteredMobile(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  const onSubmitHandler = async () => {
    try {
      if(enteredMobile == "" || enteredPassword == "") {
        throw new Error("Please enter mobile number and password!");
      }

      const response = await Client.post('/v1/session', {
        user: {
          phone: enteredMobile,
          password: enteredPassword
        }
      })

      console.log(response.data.data);
      navigation.navigate("Chat");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  let errorDisplay;
  if (errorMessage) {
    errorDisplay = <Text style={styles.errorLabel}>{errorMessage}</Text>;
  }

  return (
    <View>
      <Input
        label="Mobile number"
        onUpdateValue={updateInputValueHandler.bind(this, "mobile")}
        value={enteredMobile}
        keyboardType="numeric"
        isError={errorMessage ? true : false}
      />
      <Input
        label="Password"
        onUpdateValue={updateInputValueHandler.bind(this, "password")}
        secure
        value={enteredPassword}
        isError={errorMessage ? true : false}
      />
      {errorDisplay}
      <Button onPress={onSubmitHandler}>
        <Text>Continue</Text>
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  errorLabel: {
    color: Colors.error100,
  },
});
