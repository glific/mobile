import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';

import FieldValue from '../components/ui/FieldValue';
import { getSessionTimeLeft } from '../utils/helper';
import { RootStackParamList } from '../constants/types';
import { COLORS, SCALE, SIZES, Icon } from '../constants';
import { GET_CONTACT_INFO } from '../graphql/queries/Contact';

interface Props {
  navigation: NativeStackScreenProps<RootStackParamList, 'ContactProfile'>;
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
interface ContactInfoProp {
  name: string;
  phone: string;
  status: string;
  language: string;
  assignedTo: string[];
  collections: string[];
  fields: { [key: string]: string };
}

const formatInfo = (contacts): ContactInfoProp => {
  const { contact } = contacts;
  const assignedTo = [];
  const collections = [];

  for (const group of contact.groups) {
    collections.push(group.label);
    for (const user of group.users) {
      assignedTo.push(user.name);
    }
  }
  const fields = JSON.parse(contact.fields);
  const fieldInfo: { [key: string]: string } = {};
  for (const key in fields) {
    const item = fields[key];
    fieldInfo[item.label] = item.value;
  }
  return {
    name: contact.name,
    phone: contact.phone,
    status: contact.status,
    language: contact.language.label,
    assignedTo,
    collections,
    fields: fieldInfo,
  };
};

const ContactProfile = ({ navigation, route }: Props) => {
  const { contact } = route.params;
  const [contactInfo, setContactInfo] = useState([]);

  const { loading } = useQuery(GET_CONTACT_INFO, {
    variables: {
      id: contact.id,
    },
    onCompleted: (data) => {
      const formattedInfo = formatInfo(data.contact);
      setContactInfo(formattedInfo);
    },
  });
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.upperContainer}>
          <Icon
            testID="backIcon"
            name="arrow-left"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <Text testID={'sessionTimer'} style={styles.sessionText}>
            Session Timer: {getSessionTimeLeft(contact.lastMessageAt)}hrs
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
          <FieldValue field={'Phone'} value={contactInfo.phone} />
          <FieldValue
            field={'Assigned to'}
            value={
              contactInfo.assignedTo && contactInfo.assignedTo.length > 0
                ? contactInfo.assignedTo.join(', ')
                : 'None'
            }
          />
        </View>
        <View style={styles.rowContainer}>
          <FieldValue field={'Language'} value={contactInfo.language} />
          <FieldValue
            field={'Status'}
            value={contactInfo.status === 'VALID' ? 'Valid Contact' : 'Invalid Contact'}
          />
        </View>
        <FieldValue
          field={'Collections'}
          value={
            contactInfo.collections && contactInfo.collections.length > 0
              ? contactInfo.collections.join(', ')
              : 'None'
          }
        />
      </View>

      <View style={styles.rowContainer}>
        <Pressable
          style={styles.tabButton}
          onPress={() => navigation.navigate('ContactInformation', { fields: contactInfo.fields })}
          android_ripple={{ color: COLORS.black005 }}
        >
          <Text style={styles.tabButtonText}>View Info</Text>
        </Pressable>
        <Pressable
          style={styles.tabButton}
          onPress={() => navigation.navigate('ContactHistory', { id: contact.id })}
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
