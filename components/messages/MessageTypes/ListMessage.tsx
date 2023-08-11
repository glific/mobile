import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SCALE, SIZES } from '../../../constants';
import { MessageType } from '../Message';

interface Props {
  message: MessageType;
  time: string;
  isLeft: boolean;
}

const ListMessage = ({ message, time, isLeft }: Props) => {
  console.log(message);
  const onRight = (type: string): ViewStyle | TextStyle | undefined => {
    if (!isLeft) {
      switch (type) {
        case 'message':
          return {
            alignSelf: 'flex-end',
            borderTopRightRadius: 0,
            borderTopLeftRadius: SIZES.r10,
            backgroundColor: COLORS.lightGray,
          };
        case 'text':
          return { color: COLORS.black };
        case 'time':
          return { color: COLORS.darkGray };
        case 'option':
          return { alignSelf: 'flex-end' };
      }
    }
  };

  const options = JSON.parse(message.interactiveContent)?.items;
  return (
    <View style={[styles.quickContainer, onRight('option')]}>
      <View testID="listMessage" style={[styles.listMessageContainer, onRight('message')]}>
        <Text style={[styles.text, onRight('text')]}>{message.body}</Text>
        <Text style={[styles.time, onRight('time')]}>{time}</Text>
      </View>
      <View style={styles.optionsContainer}>
        {options?.map((item, index) => (
          <View key={index} style={styles.listOptionContainer}>
            <Text style={styles.listTitle}> ⁝ {item.title}</Text>
            {item.options.map((option, index) => (
              <View key={index} testID={`listOption_${index}`} style={styles.listButton}>
                <Ionicons name="radio-button-off" style={styles.listRadioIcon} />
                <Text style={styles.optionText}>{option.title}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ListMessage;

const styles = StyleSheet.create({
  listButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.r10,
    flexDirection: 'row',
    marginVertical: SCALE(2),
    padding: SIZES.m10,
    width: '100%',
  },
  listMessageContainer: {
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    minWidth: '70%',
    padding: SIZES.m10,
  },
  listOptionContainer: {
    marginTop: SIZES.m4,
  },
  listRadioIcon: {
    color: COLORS.primary400,
    fontSize: SIZES.s16,
    marginRight: SIZES.m4,
  },
  listTitle: {
    color: COLORS.darkGray,
    fontSize: SIZES.f12,
  },
  optionText: {
    color: COLORS.primary400,
    fontSize: SIZES.f14,
    fontWeight: '500',
    includeFontPadding: false,
  },
  optionsContainer: {
    marginTop: SIZES.m4,
  },
  quickContainer: {
    alignSelf: 'flex-start',
    margin: SIZES.m10,
    maxWidth: '70%',
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    includeFontPadding: false,
    letterSpacing: 0.2,
  },
  time: {
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    position: 'relative',
  },
});
