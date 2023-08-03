import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SCALE, SIZES } from '../constants';
import FieldValue from '../components/ui/FieldValue';

interface Props {
  navigation: unknown;
  route: {
    params: {
      contact: {
        id: string;
        name: string;
        lastMessageAt: string;
      };
    };
  };
}

const ContactProfile = ({ navigation, route }: Props) => {
  const { contact } = route.params;

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.upperContainer}>
          <AntDesign
            testID="backIcon"
            name="arrowleft"
            style={styles.backButton}
            onPress={(): void => navigation.goBack()}
          />
          <Text testID={'sessionTimer'} style={styles.sessionText}>
            Session Timer: 0
          </Text>
        </View>
        <View style={styles.lowerContainer}>
          <View testID="userProfile" style={styles.avatar}>
            <Text style={styles.avatartext}>{contact.name.charAt(0)}</Text>
          </View>
          <Text testID="userName" style={styles.nameText} numberOfLines={1}>
            {contact.name}
          </Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.rowContainer}>
          <FieldValue field={'Phone'} value={'+919876543210'} />
          <FieldValue field={'Assigned to'} value={'None'} />
        </View>
        <View style={styles.rowContainer}>
          <FieldValue field={'Language'} value={'English'} />
          <FieldValue field={'Status'} value={'Valid Contact'} />
        </View>
        <FieldValue field={'Collections'} value={'Optin contacts'} />
      </View>

      <View style={styles.rowContainer}>
        <Pressable
          style={styles.tabButton}
          onPress={() => navigation.navigate('ContactInformation')}
          android_ripple={{ color: COLORS.black005 }}
        >
          <Text style={styles.tabButtonText}>View Info</Text>
        </Pressable>
        <Pressable
          style={styles.tabButton}
          onPress={() => navigation.navigate('ContactHistory', contact.id)}
          android_ripple={{ color: COLORS.black005 }}
        >
          <Text style={styles.tabButtonText}>Contact History</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ContactProfile;

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.m24,
    flexDirection: 'row',
    height: SIZES.s48,
    justifyContent: 'center',
    width: SIZES.s48,
  },
  avatartext: {
    color: COLORS.primary400,
    fontSize: SIZES.f18,
    fontWeight: '500',
    includeFontPadding: false,
  },
  backButton: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: SCALE(22),
    paddingRight: SIZES.m10,
  },
  bodyContainer: {
    marginTop: SIZES.m4,
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m20,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primary400,
    paddingHorizontal: SIZES.m16,
    width: '100%',
  },
  lowerContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: SIZES.m8,
    width: '100%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  nameText: {
    color: COLORS.white,
    fontSize: SIZES.f20,
    fontWeight: '500',
    letterSpacing: 1,
    marginLeft: SIZES.m10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sessionText: {
    color: COLORS.white,
    fontSize: SIZES.f12,
  },
  tabButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.m30,
    height: SIZES.s36,
    justifyContent: 'center',
    marginLeft: SIZES.m16,
    paddingHorizontal: SIZES.m16,
  },
  tabButtonText: {
    color: COLORS.primary400,
    fontSize: SIZES.f12,
    fontWeight: '500',
    includeFontPadding: false,
  },
  upperContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: SIZES.s50,
    justifyContent: 'space-between',
    width: '100%',
  },
});
