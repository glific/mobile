import React, { useContext } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { COLORS } from '../../constants';
import { Feather } from '@expo/vector-icons';
import Storage from '../../utils/asyncStorage';
import AuthContext from '../../config/AuthContext';
import Wallet from './Wallet';

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
        <DrawerItemList {...props} contentContainerStyle={{ paddingHorizontal: 6 }} />
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <Pressable onPress={LogoutHandler} style={styles.logoutButton}>
          <Feather name="log-out" size={20} color="#4e4e4e" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
  },
  topContainer: {
    paddingTop: 0,
  },
  bottomContainer: {
    height: 70,
    borderTopWidth: 0.75,
    borderTopColor: '#9e9e9e',
  },
  headerContainer: {
    backgroundColor: COLORS.secondary100,
    width: '100%',
    height: 160,
    padding: 10,
    justifyContent: 'space-between',
  },
  logo: {
    width: 58,
    height: 35,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 6,
  },
  profile: {
    backgroundColor: '#8e8e8e',
    width: 36,
    height: 36,
    borderRadius: 18,
    resizeMode: 'contain',
  },
  profileText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4e4e4e',
    marginLeft: 10,
  },
  logoutButton: {
    marginHorizontal: 16,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  logoutText: {
    marginLeft: 10,
    color: '#4e4e4e',
  },
});
