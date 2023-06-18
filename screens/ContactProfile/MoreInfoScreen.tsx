import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const MoreInfoScreen = ({ navigation }: Props) => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headContainer}>
        <AntDesign
          testID="backButton"
          name="arrowleft"
          style={styles.backButton}
          onPress={(): void => navigation.goBack()}
        />
        <Text style={{ color: COLORS.white }}>More Information</Text>
      </View>
      <View style={styles.subContainer} testID='mainContainer'>
        <Text style={styles.subHeading}>Provider status</Text>
        <Text style={styles.text}>Can send template messages</Text>
        <Text style={styles.subHeading}>Status</Text>
        <Text style={styles.text}>Optin via WA on 22/03/2023,11:59:57</Text>
        <Text style={styles.subHeading}>Role</Text>
        <Text style={styles.text}>Student</Text>
        <Text style={styles.subHeading}>Age</Text>
        <Text style={styles.text}>11 to 14</Text>
        <Text style={styles.subHeading}>Language</Text>
        <Text style={styles.text}>English</Text>
        <Text style={styles.subHeading}>Status</Text>
        <Text style={styles.text}>Valid contact</Text>
      </View>
    </ScrollView>
  );
};

export default MoreInfoScreen;

const styles = StyleSheet.create({
  subContainer: {
    marginTop: 3,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  subHeading: {
    fontWeight: '500',
    marginTop: 20,
    color: COLORS.darkGray,
  },
  text: {
    color: COLORS.black,
    fontWeight: '800',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: 22,
    paddingHorizontal: 10,
  },
  headContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primary400,
    flexDirection: 'row',
    height: 60,
    padding: '2%',
    width: '100%',
    zIndex: 50,
  },
});
