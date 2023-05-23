import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Colors } from "../constants/styles";
import Login from "../screens/Login";
import AppDrawer from "./Drawer";
import ChatScreen from "../screens/ChatScreen";


const Stack = createNativeStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary400 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.secondary100 },
      }}
    >
      <Stack.Screen
        name="Server"
        component={Server}
        options={{ title: 'Add your organisation URL' }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={AppDrawer} options={{headerShown: false}}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default AuthStack;
