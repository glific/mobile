import React from 'react';
import { Linking, Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { COLORS, SIZES } from '../../../constants';
import { MessageType } from '../Message';

interface Props {
  message: MessageType;
  time: string;
  isLeft: boolean;
}

const DocumentMessage = ({ message, time, isLeft }: Props) => {
  const media_ext = message.media.url.split('.').pop();

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
        case 'icon':
          return { color: COLORS.primary400 };
        case 'time':
          return { color: COLORS.darkGray };
        case 'innerBackground':
          return { backgroundColor: COLORS.primary10 };
      }
    }
  };

  const handleLink = () => {
    Linking.openURL(message.media.url);
  };

  return (
    <Pressable
      testID="documentMessage"
      style={[styles.container, onRight('message')]}
      onPress={handleLink}
    >
      <View style={[styles.docInnerContainer, onRight('innerBackground')]}>
        <AntDesign name="file1" style={[styles.docIcon, onRight('icon')]} />
        <View>
          <Text style={[styles.docText, onRight('text')]} numberOfLines={1}>
            {message.media.caption}
          </Text>
          <Text style={[styles.extensionText, onRight('text')]}>{media_ext}</Text>
        </View>
      </View>
      <Text style={[styles.time, onRight('time')]}>{time}</Text>
    </Pressable>
  );
};

export default DocumentMessage;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    margin: SIZES.m10,
    maxWidth: '70%',
    padding: SIZES.m10,
  },
  docIcon: {
    color: COLORS.white,
    fontSize: SIZES.f20,
    marginRight: SIZES.m10,
  },
  docInnerContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    borderRadius: SIZES.r10,
    flexDirection: 'row',
    paddingLeft: SIZES.m10,
    paddingRight: SIZES.m20,
    paddingVertical: SIZES.m12,
  },
  docText: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    fontWeight: '500',
    includeFontPadding: false,
    letterSpacing: 0.2,
    textTransform: 'capitalize',
  },
  extensionText: {
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    textTransform: 'uppercase',
  },
  time: {
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    position: 'relative',
  },
});
