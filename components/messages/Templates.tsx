import React, { RefObject, useState } from 'react';
import { Pressable, StyleSheet, View, Text, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';

import Loading from '../ui/Loading';
import SearchInput from './SearchInput';
import BottomSheet from '../ui/BottomSheet';
import { COLORS, SCALE, SIZES } from '../../constants';
import { GET_TEMPLATES } from '../../graphql/queries/Templates';

type TemplateType = {
  id: string;
  isHsm: boolean;
  body: string;
  type: string;
  numberParameters: number;
};

type Props = {
  bsRef: RefObject<unknown>;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (template: TemplateType, isTemplate: boolean) => void;
  isTemplates?: boolean;
};

const Templates = ({ bsRef, handleSelect, isTemplates = false }: Props) => {
  const [value, setValue] = useState('');

  const { loading, data } = useQuery(GET_TEMPLATES, {
    variables: {
      filter: { term: '' },
      opts: { limit: 30, offset: 0, order: 'ASC' },
    },
  });

  const onSelect = (item) => {
    bsRef.current.close();
    handleSelect(item, isTemplates);
  };

  const renderItem = ({ item }) => (
    <Pressable
      key={item.id}
      testID={`template_${item.id}`}
      style={styles.messageContainer}
      android_ripple={{ color: COLORS.primary10 }}
      onPress={() => onSelect(item)}
    >
      <MaterialCommunityIcons name="message-flash-outline" style={styles.messageIcon} />
      <View style={styles.message}>
        <Text style={styles.messageTitle}>{item.label}</Text>
        <Text style={styles.messageText}>{item.body}</Text>
      </View>
    </Pressable>
  );

  return (
    <BottomSheet refs={bsRef} draggable={false} height={SIZES.s400}>
      <FlatList
        style={styles.mainContainer}
        data={data?.sessionTemplates.filter(
          (item) =>
            item.isHsm === isTemplates && (item.label.includes(value) || item.body.includes(value))
        )}
        renderItem={renderItem}
        ListHeaderComponent={
          <SearchInput
            value={value}
            handleValue={(value: string) => setValue(value)}
            handleBack={() => bsRef.current.close()}
          />
        }
        stickyHeaderIndices={[0]}
      />
      {loading && <Loading />}
    </BottomSheet>
  );
};

export default Templates;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  message: {
    flex: 1,
    marginLeft: SIZES.m12,
  },
  messageContainer: {
    borderBottomWidth: SCALE(0.5),
    borderColor: COLORS.lightGray,
    flexDirection: 'row',
    height: 'auto',
    padding: SIZES.m12,
  },
  messageIcon: {
    color: COLORS.primary400,
    fontSize: SIZES.f18,
  },
  messageText: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    marginTop: SIZES.m4,
  },
  messageTitle: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    fontWeight: '500',
    includeFontPadding: false,
  },
});
