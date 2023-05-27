import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const LoadingPage = () => {
  return (
    <ActivityIndicator
      testID="loadingIndicator"
      size="large"
      color={COLORS.primary400}
      style={styles.container}
    />
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 50,
    position: 'absolute',
  },
});
