import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { gql, useQuery } from '@apollo/client';

const BSPBALANCE = gql`
  query bspbalance {
    bspbalance
  }
`;

const Wallet = () => {
  const { data } = useQuery(BSPBALANCE);
  console.log(data);

  return (
    <View style={styles.walletcontainer}>
      <View style={styles.innercontainer}>
        <MaterialCommunityIcons
          name="wallet-outline"
          size={24}
          color="white"
          style={styles.walleticon}
        />
        <Text style={styles.walletText}>Your Wallet Balance</Text>
        <View>
          <Text style={styles.dollarText}>{data}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  walletcontainer: {
    backgroundColor: '#119656',
    height: 40,
  },
  innercontainer: {
    flexDirection: 'row',
  },
  walleticon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 10,
  },
  walletText: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 8,
    marginLeft: 12,
  },
  dollarText: {
    color: 'white',
    fontSize: 17,
    marginTop: 8,
    marginLeft: 40,
    fontWeight: 800,
  },
});

export default Wallet;
