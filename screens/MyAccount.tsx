import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MyAccount = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>MyAccount</Text>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
