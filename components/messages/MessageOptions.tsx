import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, SIZES, Icon, SCALE } from '../../constants';

interface MessageOptionsProps {
  onSpeedSend: () => void;
  onTemplates: () => void;
  onInteractiveMessage: () => void;
}

const MessageOptions: React.FC<MessageOptionsProps> = ({
  onSpeedSend,
  onTemplates,
  onInteractiveMessage,
}) => {
  return (
    <View testID="optionsTab">
      <Pressable
        testID="speedSend"
        style={styles.optionsButton}
        android_ripple={{ borderless: false, color: COLORS.primary10 }}
        onPress={onSpeedSend}
      >
        <Icon name="speed-send" style={styles.optionIcon} />
        <Text style={styles.optionsText}>Speed sends</Text>
      </Pressable>
      <Pressable
        testID="templates"
        style={styles.optionsButton}
        android_ripple={{ borderless: false, color: COLORS.primary10 }}
        onPress={onTemplates}
      >
        <Icon name="templates" style={styles.optionIcon} />
        <Text style={styles.optionsText}>Templates</Text>
      </Pressable>
      <Pressable
        testID="interactive"
        style={styles.optionsButton}
        android_ripple={{ borderless: false, color: COLORS.primary10 }}
        onPress={onInteractiveMessage}
      >
        <Icon name="interactive-message" style={styles.optionIcon} />
        <Text style={styles.optionsText}>Interactive message</Text>
      </Pressable>
    </View>
  );
};

export default MessageOptions;

const styles = StyleSheet.create({
  optionIcon: {
    color: COLORS.primary100,
    fontSize: SIZES.m20,
  },
  optionsButton: {
    alignItems: 'center',
    borderBottomWidth: SCALE(0.5),
    borderColor: COLORS.lightGray,
    flexDirection: 'row',
    paddingHorizontal: SIZES.m20,
    paddingVertical: SIZES.m16,
    width: '100%',
  },
  optionsText: {
    fontSize: SIZES.f14,
    fontWeight: '500',
    includeFontPadding: false,
    marginLeft: SIZES.m16,
  },
});
