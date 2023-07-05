import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants';

type LoadingProps = {
  color?: string;
  size?: 'large' | 'small';
};

const Loading: React.FC<LoadingProps> = ({ color = COLORS.primary400, size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator testID="loadingIndicator" size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
});
