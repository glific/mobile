import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants';

export interface ContactProps {
  id: number;
  name: string;
  lastMessageAt: string;
}

const Contact: React.FC<ContactProps> = ({ id, name, lastMessageAt }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      testID="contactCard"
      onPress={() => navigation.navigate('ChatScreen', { contact: { id, name, lastMessageAt } })}
      style={styles.item}
      android_ripple={{ color: COLORS.primary10 }}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatartext}>{name.charAt(0)}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.primary10,
    borderRadius: 22,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  avatartext: {
    color: COLORS.primary400,
    fontSize: 18,
    fontWeight: '500',
  },
  item: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: '4%',
    width: '100%',
  },
  name: {
    fontSize: 16,
    marginLeft: 18,
  },
});

export default Contact;
