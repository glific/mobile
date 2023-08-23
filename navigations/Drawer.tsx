import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabs from './HomeTabs';
import Help from '../screens/Help';
import Setting from '../screens/Setting';
import MyAccount from '../screens/MyAccount';
import Notifications from '../screens/Notifications';
import CustomDrawer from '../components/navigation/CustomDrawer';
import HomeHeaderRight from '../components/headers/HomeHeaderRight';
import NotificationHeader from '../components/headers/NotificationHeader';
import { COLORS, Icon, SCALE, SIZES } from '../constants';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const [notificationSearch, setNotificationSearch] = useState('');
  const handleSearch = (searchValue: string) => {
    setNotificationSearch(searchValue);
  };
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
              <Icon name="chats" style={styles.drawerItemIcon} color={color} />
            ),
            headerRight: () => <HomeHeaderRight navigation={navigation} />,
          };
        }}
      />
      <Drawer.Screen
        name="Notifications"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="notification" style={styles.drawerItemIcon} color={color} />
          ),
          headerRight: () => (
            <NotificationHeader searchValue={notificationSearch} handleSearch={handleSearch} />
          ),
        }}
      >
        {() => <Notifications searchValue={notificationSearch} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="profile" style={styles.drawerItemIcon} color={color} />
          ),
          title: 'My Account',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Setting}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="settings" style={styles.drawerItemIcon} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="question-mark" style={styles.drawerItemIcon} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  drawerItemIcon: {
    fontSize: SIZES.s20,
    marginLeft: SIZES.m12,
  },
});
