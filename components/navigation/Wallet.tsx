import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';

import LoadingPage from '../ui/Loading';
import { COLORS, SIZES } from '../../constants';
import { BSP_BALANCE } from '../../graphql/queries/Account';

const Wallet = () => {
  const { loading, data } = useQuery(BSP_BALANCE);

  if (loading) {
    return <LoadingPage />;
  }

  let balance;

  if (data && data.bspbalance) {
    balance = JSON.parse(data.bspbalance).balance;
    balance = parseFloat(balance).toFixed(2);
  }

  return (
    <View style={styles.walletContainer}>
      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          name="wallet-outline"
          size={24}
          color="white"
          style={styles.walletIcon}
        />
        <Text style={styles.walletText}>Your Wallet Balance</Text>
      </View>
      <Text style={styles.dollarText}>$ {balance}</Text>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  dollarText: {
    color: COLORS.white,
    fontSize: SIZES.f16,
    fontWeight: '800',
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  walletContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primary100,
    flexDirection: 'row',
    height: SIZES.m40,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m16,
  },
  walletIcon: {
    fontSize: SIZES.s24,
    fontWeight: '400',
    marginLeft: SIZES.m4,
  },
  walletText: {
    color: COLORS.white,
    fontSize: SIZES.f16,
    fontWeight: '400',
    marginLeft: SIZES.m16,
  },
});
