import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "../constants/styles";
import AppDrawer from "./Drawer";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary400 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.secondary100 },
        }}
      >
        <Stack.Screen name="Home" component={AppDrawer} />
      </Stack.Navigator>
    );
};

export default AppStack;