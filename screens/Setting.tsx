import { StyleSheet, Image, View, Text } from 'react-native';
import React from 'react';
import { COLORS, SCALE, SIZES } from '../constants';

const Setting = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Image source={require('../assets/underConstruction.png')} style={styles.image} />
        <Text style={styles.text}>Under Construction</Text>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  image: {
    height: SCALE(200),
    width: SCALE(200),
  },
  innerContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
  },
});
