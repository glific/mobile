import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants';

type LoadingProps = {
  color?: string;
  size?: 'large' | 'small';
  relative?: boolean;
};

const Loading: React.FC<LoadingProps> = ({
  color = COLORS.primary400,
  size = 'large',
  relative = false,
}) => {
  return (
    <View style={[styles.container, relative && styles.relativeContainer]}>
      <ActivityIndicator testID="loadingIndicator" size={size} color={color} />
    </View>
  );
};

export default memo(Loading);

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
  relativeContainer: {
    position: 'relative',
    zIndex: 0,
  },
});
