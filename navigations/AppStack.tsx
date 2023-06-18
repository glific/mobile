import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants';
import AppDrawer from './Drawer';
import ChatScreen from '../screens/ChatScreen';
import ContactProfile from '../screens/ContactProfile/ContactProfile';
import MoreInfoScreen from '../screens/ContactProfile/MoreInfoScreen';
import ContactHistoryScreen from '../screens/ContactProfile/ContactHistoryScreen';

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
      <Stack.Screen name="ContactProfile" component={ContactProfile} />
      <Stack.Screen name="MoreInfo" component={MoreInfoScreen} />
      <Stack.Screen name="ContactHistoryScreen" component={ContactHistoryScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
