import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/styles';

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
    width: '92%',
    alignSelf: 'center',
    marginTop: 12,
  },
  shadowCard: {
    position: 'absolute',
    bottom: -4,
    width: '98.6%',
    height: 112,
    backgroundColor: Colors.primary10,
    borderWidth: 0.75,
    borderRadius: 10,
    borderColor: Colors.primary50,
  },
  frontCard: {
    width: '98.6%',
    height: 112,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderWidth: 0.75,
    borderRadius: 10,
    borderColor: Colors.primary50,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
    color: Colors.black,
  },
  bodyText: {
    fontSize: 13,
    textAlignVertical: 'center',
    color: Colors.black,
    marginBottom: 6,
  },
});
