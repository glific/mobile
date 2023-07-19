import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants';

interface FieldValueProps {
  testID?: string;
  field: string;
  value: string;
}

const FieldValue: React.FC<FieldValueProps> = ({ testID, field, value }) => {
  return (
    <View testID={testID ? testID : field} style={styles.mainContainer}>
      <Text style={styles.fieldText}>{field}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

export default FieldValue;

const styles = StyleSheet.create({
  fieldText: {
    color: COLORS.darkGray,
    fontSize: SIZES.f12,
    marginBottom: SIZES.m2,
  },
  mainContainer: {
    flex: 1,
    marginBottom: SIZES.m24,
  },
  valueText: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    fontWeight: '500',
  },
});
