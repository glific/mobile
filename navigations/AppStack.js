import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '../constants/styles';
import AppDrawer from './Drawer';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.secondary100 },
        animation: 'simple_push',
      }}
    >
      <Stack.Screen name="Home" component={AppDrawer} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      {/* <Stack.Screen name="Filter" component={Filter} /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
