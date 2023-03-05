import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../components/ui/Input";

const Server = () => {
  const [serverURL, setServerURL] = useState("");

  const serverURLChanged = (value: string) => {
    setServerURL(value);
  };

  return (
    <View>
      <Input label="Server URL" onUpdateValue={serverURLChanged} value={serverURL} />
    </View>
  );
};

export default Server;
