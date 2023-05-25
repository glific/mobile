import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SCALE, SIZES } from '../constants';

const InstructionCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.shadowCard} />
      <View style={styles.frontCard}>
        <Text style={styles.titleText}>How to do?</Text>
        <Text style={styles.bodyText}>1. Open your Glific web app</Text>
        <Text style={styles.bodyText}>2. Copy & paste the web URL into the Input field</Text>
      </View>
    </View>
  );
};

export default InstructionCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: SIZES.s328,
    alignSelf: 'center',
    marginTop: SIZES.m12,
  },
  shadowCard: {
    position: 'absolute',
    bottom: -SIZES.m4,
    width: '98.6%',
    height: SCALE(112),
    backgroundColor: COLORS.primary10,
    borderWidth: SCALE(0.75),
    borderRadius: SIZES.r10,
    borderColor: COLORS.primary50,
  },
  frontCard: {
    width: '98.6%',
    height: SCALE(112),
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderWidth: SCALE(0.75),
    borderRadius: SIZES.r10,
    borderColor: COLORS.primary50,
    paddingHorizontal: SIZES.m20,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: SIZES.f16,
    fontWeight: '500',
    marginBottom: SCALE(8),
    color: COLORS.black,
  },
  bodyText: {
    fontSize: SIZES.f12,
    textAlignVertical: 'center',
    color: COLORS.black,
    marginBottom: SIZES.m6,
  },
});
