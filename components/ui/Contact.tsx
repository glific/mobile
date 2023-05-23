import { StyleSheet, Text, View } from 'react-native';
import { ContactProp } from '../../constants/interfaces';

const Contact: React.FC<ContactProp> = (props): JSX.Element => {
  return (
    <View style={styles.contactItem}>
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
