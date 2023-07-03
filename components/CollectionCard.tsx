import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SCALE, SIZES } from '../constants';

export interface CollectionCardProps {
  id: string;
  name: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ id, name }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      testID="collectionCard"
      onPress={() =>
        navigation.navigate('ChatScreen', {
          id: id,
          displayName: name,
          conversationType: 'collection',
        })
      }
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

export default CollectionCard;

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.r4,
    flexDirection: 'row',
    height: SIZES.s44,
    justifyContent: 'center',
    width: SIZES.s44,
  },
  avatartext: {
    color: COLORS.primary400,
    fontSize: SIZES.f18,
    fontWeight: '500',
    includeFontPadding: false,
  },
  item: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: SCALE(0.25),
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    height: SIZES.s70,
    paddingHorizontal: '4%',
    width: '100%',
  },
  name: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    fontWeight: '600',
    marginLeft: SIZES.m16,
  },
});
