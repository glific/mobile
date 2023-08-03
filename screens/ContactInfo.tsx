import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import FieldValue from '../components/ui/FieldValue';
import { COLORS, SIZES } from '../constants';

interface Props {
  navigation: unknown;
  route: {
    params: {
      object: { [key: string]: string };
    };
  };
}
const ContactInfo = ({ navigation, route }: Props) => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.bodyContainer}>
        {Object.keys(route.params).length === 0 ? (
          <Text style={styles.placeholder}>No Fields Available</Text>
        ) : (
          Object.entries(route.params).map(([field, value]) => (
            <FieldValue key={field} field={field} value={value} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default ContactInfo;

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    flexShrink: 1,
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m24,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  placeholder: {
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    textAlign: 'center',
  },
});
