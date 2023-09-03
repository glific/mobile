import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Loading from './Loading';
import { COLORS, SIZES } from '../../constants';

interface Props {
  loadingMore: boolean;
}

const LoadMoreFooter = ({ loadingMore }: Props) => {
  return (
    <>
      {loadingMore && (
        <View style={styles.loaderContainer}>
          <Loading relative size="small" color={COLORS.darkGray} />
          <Text style={styles.loadingText}> Loading...</Text>
        </View>
      )}
    </>
  );
};

export default LoadMoreFooter;

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: SIZES.m8,
  },
  loadingText: {
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    fontWeight: '500',
  },
});
