import { StyleSheet, Text, View } from 'react-native';
export interface ContactProps {
  name: string | null;
}

const Contact: React.FC<ContactProps> = (props): JSX.Element => {
  return (
    <View testID="Contact Card" style={styles.contactItem}>
      <Text style={styles.contactName}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Contact;
