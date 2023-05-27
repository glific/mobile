import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';

import LoadingPage from '../ui/Loading';
import { COLORS, SIZES } from '../../constants';
import { BSP_BALANCE } from '../../graphql/queries/Balance';

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
        <Text style={styles.dollarText}>$ {balance}</Text>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  dollarText: {
    color: COLORS.white,
    fontSize: SIZES.f16,
    fontWeight: '800',
    marginLeft: 'auto',
    marginRight: SIZES.m6,
    marginTop: SIZES.m6,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
  },
  walletContainer: {
    backgroundColor: COLORS.primary100,
    height: SIZES.m40,
  },
  walletIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.m10,
    marginTop: SIZES.m6,
  },
  walletText: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    marginLeft: SIZES.m12,
    marginTop: SIZES.m6,
  },
});
