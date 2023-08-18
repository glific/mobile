import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { MessageType } from '../Message';
import { MessageTime, onRight } from './AudioMessage';
import { COLORS, SIZES, Icon } from '../../../constants';

interface Props {
  message: MessageType;
  time: string;
  isLeft: boolean;
}

const DocumentMessage = ({ message, time, isLeft }: Props) => {
  const media_ext = message.media.url.split('.').pop();

  const handleLink = () => {
    Linking.openURL(message.media.url);
  };

  return (
    <Pressable
      testID="documentMessage"
      style={[styles.container, onRight('message', isLeft)]}
      onPress={handleLink}
    >
      <View style={[styles.docInnerContainer, onRight('innerBackground', isLeft)]}>
        <Icon name="file-document" style={[styles.docIcon, onRight('icon', isLeft)]} />
        <View>
          <Text style={[styles.docText, onRight('text', isLeft)]} numberOfLines={1}>
            {message.media.caption}
          </Text>
          <Text style={[styles.extensionText, onRight('text', isLeft)]}>{media_ext}</Text>
        </View>
      </View>
      <MessageTime time={time} isLeft={isLeft} />
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
});
