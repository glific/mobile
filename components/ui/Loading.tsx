import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const Loading = () => {
  return (
    <ActivityIndicator
      testID="loadingIndicator"
      size="large"
      color={COLORS.primary400}
      style={styles.container}
    />
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: SIZES.s50,
    position: 'absolute',
    zIndex: 100,
  },
});
