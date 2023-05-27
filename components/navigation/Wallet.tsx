import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import LoadingPage from '../ui/Loading';
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

const styles = StyleSheet.create({
  walletContainer: {
    backgroundColor: '#119656',
    height: 40,
  },
  innerContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
  },
  walletIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 10,
  },
  walletText: {
    color: 'white',
    fontSize: 14,
    marginTop: 8,
    marginLeft: 12,
  },
  dollarText: {
    color: 'white',
    fontSize: 17,
    marginTop: 8,
    marginLeft: 'auto',
    marginRight: 8,
    fontWeight: '800',
  },
});

export default Wallet;
