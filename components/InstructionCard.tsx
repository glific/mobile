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
  bodyText: {
    color: COLORS.black,
    fontSize: SIZES.f12,
    marginBottom: SIZES.m6,
    textAlignVertical: 'center',
  },
  cardContainer: {
    alignSelf: 'center',
    marginTop: SIZES.m12,
    width: SIZES.s328,
  },
  frontCard: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary50,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    height: SCALE(112),
    justifyContent: 'center',
    paddingHorizontal: SIZES.m20,
    width: '98.6%',
  },
  shadowCard: {
    backgroundColor: COLORS.primary10,
    borderColor: COLORS.primary50,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    bottom: -SIZES.m4,
    height: SCALE(112),
    position: 'absolute',
    width: '98.6%',
  },
  titleText: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    fontWeight: '500',
    marginBottom: SCALE(8),
  },
});
