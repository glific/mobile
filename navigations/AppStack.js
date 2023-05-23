import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '../constants/styles';
import AppDrawer from './Drawer';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.secondary100 },
      }}
    >
      <Stack.Screen name="Home" component={AppDrawer} />
      <Stack.Screen name="Chat Page" component={ChatPage} />
    </Stack.Navigator>
  );
};

export default AppStack;
