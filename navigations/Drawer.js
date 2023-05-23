import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Colors } from '../constants/styles';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Notifications from '../screens/Notifications';
import MyAccount from '../screens/MyAccount';
import Setting from '../screens/Setting';
import Help from '../screens/Help';
import CustomDrawer from '../components/navigation/CustomDrawer';
import HomeTabs from './HomeTabs';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveBackgroundColor: Colors.primary400,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -15,
        },
        headerStyle: { backgroundColor: Colors.primary400 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.secondary100 },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Chat"
        component={HomeTabs}
        options={{
          drawerIcon: ({ color }) => <Entypo name="chat" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="notifications" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="ios-settings" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="help-circle" size={20} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
