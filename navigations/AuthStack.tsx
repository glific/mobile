import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS, SIZES } from '../constants';
import Login from '../screens/Login';
import Server from '../screens/Server';
import ResetPassword from '../screens/ResetPassword';
import OtpScreen from '../screens/OtpScreen';
import NewPassword from '../screens/NewPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary400 },
        headerTintColor: COLORS.white,
        contentStyle: { backgroundColor: COLORS.secondary100 },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Server"
        component={Server}
        options={{ title: 'Add your organisation URL' }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: 'Reset your password' }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{ title: 'Reset your password' }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{ title: 'Create new password' }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
