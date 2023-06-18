import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants';

const CollectionListItem: React.FC<CollectionListItemProps> = ({ id, name }) => {
  const navigation = useNavigation();
  // const { loading, error, data } = useQuery(GET_SAVED_SEARCH, { variables });

  return (
    <Pressable
      testID="CollectionListItemCard"
      onPress={() => navigation.navigate('ChatScreen', { contact: { id, name } })}
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
    borderRadius: SIZES.r22,
    flexDirection: 'row',
    height: SIZES.s44,
    justifyContent: 'center',
    width: SIZES.s44,
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
    height: SIZES.s70,
    paddingHorizontal: '4%',
    width: '100%',
  },
  name: {
    fontSize: SIZES.f16,
    marginLeft: SIZES.m16,
  },
});

export default CollectionListItem;
