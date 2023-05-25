import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants';

const screenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const LoadingPage = () => {
  return (
    <View testID="loadingIndicator" style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary400} />
    </View>
  );
};

const margin = 0.5 * screenDimensions.height;

const styles = StyleSheet.create({
  container: {
    marginVertical: margin,
  },
});

export default LoadingPage;
