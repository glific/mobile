import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../constants/styles';

const screenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const LoadingPage = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary400} />
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
