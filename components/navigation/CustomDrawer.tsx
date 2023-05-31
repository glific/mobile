import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import Wallet from './Wallet';
import { Feather } from '@expo/vector-icons';
import Storage from '../../utils/asyncStorage';
import { COLORS, SCALE, SIZES } from '../../constants';
import AuthContext from '../../config/AuthContext';
import AxiosService from '../../config/axios';

type DrawerContentProps = {
  navigation: any;
};

const CustomDrawer: React.FC<DrawerContentProps> = (props: any) => {
  const [orgName, setOrgName] = useState('');
  const { setToken } = useContext(AuthContext);

  const FetchOrganisation = async () => {
    try {
      const Client = await AxiosService.createAxiosInstance();
      const response = await Client.post('/v1/session/name');
      setOrgName(response?.data?.data?.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchOrganisation();
  }, []);

  const LogoutHandler = async () => {
    await Storage.removeData('session');
    setToken(null);
  };

  return (
    <View style={styles.mainContainer}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.topContainer}>
        <View style={styles.headerContainer}>
          <Image source={require('../../assets/glific-logo.png')} style={styles.logo} />
          <View style={styles.profileContainer}>
            <View style={styles.profile}>
              <Text style={styles.profileText}>{orgName[0]}</Text>
            </View>
            <Text style={styles.orgText}>{orgName}</Text>
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
          <Feather name="log-out" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  bottomContainer: {
    height: SIZES.s60,
  },
  headerContainer: {
    backgroundColor: COLORS.primary400,
    height: SCALE(150),
    justifyContent: 'space-between',
    marginBottom: 0,
    padding: SIZES.m10,
    paddingTop: SIZES.m30,
    width: '100%',
  },
  logo: {
    height: SCALE(38),
    width: SCALE(62),
  },
  logoutButton: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SCALE(56),
    paddingHorizontal: SIZES.m16,
  },
  logoutIcon: {
    color: COLORS.error100,
    fontSize: SIZES.s20,
  },
  logoutText: {
    color: COLORS.error100,
    fontSize: SIZES.f16,
    marginLeft: SIZES.m16,
  },
  mainContainer: {
    flex: 1,
  },
  orgText: {
    color: COLORS.white,
    fontSize: SIZES.f18,
    fontWeight: '500',
    marginLeft: SIZES.m12,
  },
  profile: {
    alignItems: 'center',
    backgroundColor: COLORS.primary100,
    borderRadius: SIZES.r20,
    height: SIZES.s40,
    justifyContent: 'center',
    width: SIZES.s40,
  },
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SCALE(2),
    paddingLeft: SIZES.m6,
  },
  profileText: {
    color: COLORS.white,
    fontSize: SIZES.f20,
    fontWeight: '600',
    includeFontPadding: false,
  },
  topContainer: {
    paddingTop: 0,
  },
});
