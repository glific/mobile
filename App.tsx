import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View,  SafeAreaView,FlatList,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "./constants/styles";
import Login from "./screens/Login";
import Server from "./screens/Server";
import Chat from "./screens/Chat";
import ChatScreen from "./screens/ChatScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary400 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.secondary100 },
      }}
    >
      {/* <Stack.Screen name="Server" component={Server} />
      <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
				headerShown: false}} />

    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary400 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.secondary100 },
      }}
    >
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {}