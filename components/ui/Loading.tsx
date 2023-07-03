import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SCALE } from '../../constants';

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
    position: 'absolute',
    top: SCALE(70),
    zIndex: 100,
  },
});
