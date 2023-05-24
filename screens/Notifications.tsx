import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Notifications = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
