import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';

import { BSP_BALANCE } from '../../graphql/queries/Account';
import { COLORS, SIZES } from '../../constants';
import Loading from '../ui/Loading';

const Wallet = () => {
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  const { loading } = useQuery(BSP_BALANCE, {
    onCompleted: (data) => {
      const balance = JSON.parse(data.bspbalance).balance;
      setError('');
      setBalance(parseFloat(balance).toFixed(2));
    },
    onError: () => {
      setError('Please check gupshup settings');
    },
  });

  return (
    <View style={[styles.walletContainer, error !== '' && styles.errorContainer]}>
      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          testID="walletIcon"
          name="wallet-outline"
          size={24}
          color="white"
          style={styles.walletIcon}
        />
        <Text style={styles.walletText}>{error !== '' ? error : 'Your Wallet Balance'}</Text>
      </View>
      {error === '' ? (
        loading ? (
          <Loading size="small" color={COLORS.white} relative />
        ) : (
          <Text style={styles.dollarText}>$ {balance}</Text>
        )
      ) : null}
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  dollarText: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    fontWeight: '800',
  },
  errorContainer: {
    backgroundColor: COLORS.error100,
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
    fontSize: SIZES.f14,
    fontWeight: '400',
    marginLeft: SIZES.m16,
  },
});
