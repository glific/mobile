import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

const LoadingPage = () => {
  return (
    <ActivityIndicator
      testID="loadingIndicator"
      size="large"
      color={Colors.primary400}
      style={styles.container}
    />
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: 50,
  },
});
