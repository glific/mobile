import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Input from "../components/ui/Input";

const Login = () => {
  const [enteredMobile, setEnteredMobile] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "mobile":
        setEnteredMobile(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  return (
    <View>
      <Text>Login Screen</Text>
      <Input
        label="Mobile number"
        onChangeText={updateInputValueHandler.bind(this, "mobile")}
        value={enteredMobile}
        keyboardType="numeric"
        isError={errorMessage ? true : false}
      />
      <Input
        label="Password"
        onChangeText={updateInputValueHandler.bind(this, "password")}
        secure
        value={enteredPassword}
        isError={errorMessage ? true : false}
      />
    </View>
  );
};

export default Login;
