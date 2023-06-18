import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const ContactProfile = ({ navigation, route }: Props) => {
  const { contact } = route.params;
  const navigate = useNavigation();
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headContainer}>
        <AntDesign
          testID="backButton"
          name="arrowleft"
          style={styles.backButton}
          onPress={(): void => navigation.goBack()}
        />
        <View style={styles.topHead}>
          <Pressable style={{ width: '100%', margin: SIZES.m16 }}>
            <Text style={{ color: COLORS.white }}>Session Timer:0</Text>
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.innerContainer} android_ripple={{ color: COLORS.primary70 }}>
        <View>
          <Image
            testID="userProfile"
            source={require('../../assets/icon.png')}
            style={styles.avatar}
          />
        </View>
        <Text testID="userName" style={styles.nameText}>
          {contact.name}
        </Text>
      </Pressable>
      <View style={styles.subContainer} testID='mainContainer'>
        <Text style={styles.subHeading}>
          Phone{'\n'}
          <Text style={styles.text}>+919876543210</Text>
        </Text>
        <Text style={styles.subHeading}>
          Assigged to{'\n'}
          <Text style={styles.text}>None</Text>
        </Text>
        <Text style={styles.subHeading}>
          Language{'\n'}
          <Text style={styles.text}>English</Text>
        </Text>
        <Text style={styles.subHeading}>
          Status{'\n'}
          <Text style={styles.text}>Valid contact</Text>
        </Text>
        <Text style={styles.subHeading}>
          Collections{'\n'}
          <Text style={styles.text}>Optin contacts</Text>
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigate.navigate('MoreInfo')}>
          <Text>View Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate.navigate('ContactHistoryScreen', { contact: contact })}
        >
          <Text>Contact History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ContactProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primary400,
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'space-between',
    padding: '2%',
    width: '100%',
    zIndex: 50,
  },
  arrow: {
    color: COLORS.darkGray,
  },
  subContainer: {
    marginBottom: SIZES.m12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  topHead: {
    flexDirection: 'column',
  },
  heading: {
    fontSize: 18,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  subHeading: {
    fontWeight: '500',
    marginTop: 20,
    width: '50%',
    flexDirection: 'row',
    color: COLORS.darkGray,
  },
  text: {
    color: COLORS.black,
    fontWeight: '800',
  },
  avatar: {
    borderRadius: 20,
    height: 48,
    width: 48,
  },
  backButton: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: 22,
    paddingHorizontal: 10,
  },
  innerContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.darkDarkGreen,
    flexDirection: 'row',
    padding: SIZES.m10,
    paddingBottom: SIZES.m18,
  },
  nameText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 1,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    marginLeft: SIZES.m16,
  },
  button: {
    width: 'auto',
    backgroundColor: COLORS.lightGreen,
    fontSize: SIZES.f10,
    padding: SIZES.m10,
    alignItems: 'center',
    borderRadius: SIZES.r10,
    fontWeight: '500',
  },
});
