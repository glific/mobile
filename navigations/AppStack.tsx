import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../constants';
import AppDrawer from './Drawer';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.secondary100 },
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
