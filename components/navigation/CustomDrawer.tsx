import React, { useContext } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import Wallet from './Wallet';
import { COLORS } from '../../constants';
import Storage from '../../utils/asyncStorage';
import AuthContext from '../../config/AuthContext';

type DrawerContentProps = {
  navigation: any;
};

const CustomDrawer: React.FC<DrawerContentProps> = (props: any) => {
  const { setToken } = useContext(AuthContext);

  const LogoutHandler = async () => {
    await Storage.removeData('session');
    setToken(null);
  };

  return (
    <View style={styles.mainConatiner}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Image source={require('../../assets/glific-logo.png')} style={styles.logo} />
          <View style={styles.profileContainer}>
            <Image source={require('../../assets/icon.png')} style={styles.profile} />
            <Text style={styles.profileText}>Aman</Text>
          </View>
        </View>
        <Wallet />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <Pressable
          onPress={LogoutHandler}
          style={styles.logoutButton}
          android_ripple={{ borderless: false }}
        >
          <Feather name="log-out" size={20} color="#4e4e4e" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  bottomContainer: {
    borderTopColor: COLORS.white,
    borderTopWidth: 0.75,
    height: 70,
  },
  headerContainer: {
    backgroundColor: COLORS.primary400,
    height: 120,
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  logo: {
    height: 35,
    width: 58,
  },
  logoutButton: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    marginHorizontal: 16,
    marginTop: 16,
  },
  logoutText: {
    color: COLORS.error100,
    marginLeft: 10,
  },
  mainConatiner: {
    flex: 1,
  },
  profile: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 18,
    height: 36,
    resizeMode: 'contain',
    width: 36,
  },
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 6,
    paddingHorizontal: 6,
  },
  profileText: {
    color: COLORS.darkGray,
    fontSize: 18,
    fontWeight: 500,
    marginLeft: 10,
  },
  topContainer: {
    paddingTop: 0,
  },
});
