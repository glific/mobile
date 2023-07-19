import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../constants';
import AppDrawer from './Drawer';
import ChatScreen from '../screens/ChatScreen';
import ContactProfile from '../screens/ContactProfile';
import ConversationFilter from '../screens/ConversationFilter';
import ContactHistory from '../screens/ContactHistory';
import ContactInfo from '../screens/ContactInfo';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: COLORS.primary400 },
        headerTintColor: COLORS.white,
        contentStyle: { backgroundColor: COLORS.secondary100 },
        animation: 'simple_push',
      }}
    >
      <Stack.Screen name="Home" component={AppDrawer} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ContactProfile" component={ContactProfile} />
      <Stack.Screen
        name="ContactInformation"
        component={ContactInfo}
        options={{
          headerShown: true,
          title: 'More Information',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ContactHistory"
        component={ContactHistory}
        options={{
          headerShown: true,
          title: 'Contact History',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ConversationFilter"
        component={ConversationFilter}
        options={{
          headerShown: true,
          title: 'Conversations Filter',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
