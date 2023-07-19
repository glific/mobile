import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeTabs from './HomeTabs';
import Help from '../screens/Help';
import Setting from '../screens/Setting';
import MyAccount from '../screens/MyAccount';
import HomeHeaderRight from '../components/headers/HomeHeaderRight';
import CustomDrawer from '../components/navigation/CustomDrawer';
import { COLORS, SCALE, SIZES } from '../constants';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Chat"
      screenOptions={{
        drawerStyle: {
          width: SCALE(308),
        },
        drawerLabelStyle: {
          fontSize: SIZES.f14,
          fontWeight: '400',
          marginLeft: -SIZES.f14,
        },
        drawerItemStyle: {
          borderRadius: 0,
          width: '100%',
          height: SCALE(56),
          justifyContent: 'center',
          marginHorizontal: 0,
          marginVertical: 0,
        },
        headerTintColor: COLORS.white,
        drawerActiveTintColor: COLORS.primary400,
        drawerInactiveTintColor: COLORS.black,
        drawerActiveBackgroundColor: COLORS.primary10,
        headerStyle: { backgroundColor: COLORS.primary400 },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Chats"
        component={HomeTabs}
        options={({ navigation }) => {
          return {
            drawerIcon: ({ color }) => (
              <Ionicons name="md-chatbox-outline" style={styles.drawerItemIcon} color={color} />
            ),
            headerRight: () => <HomeHeaderRight navigation={navigation} />,
          };
        }}
      />
      <Drawer.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              style={styles.drawerItemIcon}
              color={color}
            />
          ),
          title: 'My Account',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Setting}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-settings-outline" style={styles.drawerItemIcon} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" style={styles.drawerItemIcon} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  drawerItemIcon: {
    fontSize: SIZES.s18,
    marginLeft: SIZES.m12,
  },
});
