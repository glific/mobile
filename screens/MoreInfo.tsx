import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import FieldValue from '../components/ui/FieldValue';
import { COLORS, SIZES } from '../constants';

const MoreInfo = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.bodyContainer}>
        <FieldValue field={'Provider status'} value={'Can send template messages'} />
        <FieldValue field={'Status'} value={'Optin via WA on 22/03/2023, 11:59:57'} />
        <FieldValue field={'Role'} value={'Student'} />
        <FieldValue field={'Age'} value={'11 to 14'} />
        <FieldValue field={'Language'} value={'English'} />
        <FieldValue testID={'contactStatus'} field={'Status'} value={'Valid contact'} />
      </View>
    </ScrollView>
  );
};

export default MoreInfo;

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
});
