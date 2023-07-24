import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';

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
        android_ripple={{ borderless: false }}
        onPress={onSpeedSend}
      >
        <MaterialCommunityIcons name="message-flash" style={styles.optionIcon} />
        <Text style={styles.optionsText}>Speed sends</Text>
      </Pressable>
      <Pressable
        testID="templates"
        style={styles.optionsButton}
        android_ripple={{ borderless: false }}
        onPress={onTemplates}
      >
        <MaterialCommunityIcons name="message-star" style={styles.optionIcon} />
        <Text style={styles.optionsText}>Templates</Text>
      </Pressable>
      <Pressable
        testID="interactive"
        style={styles.optionsButton}
        android_ripple={{ borderless: false }}
        onPress={onInteractiveMessage}
      >
        <MaterialCommunityIcons name="gesture-tap-button" style={styles.optionIcon} />
        <Text style={styles.optionsText}>Interactive message</Text>
      </Pressable>
    </View>
  );
};

export default MessageOptions;

const styles = StyleSheet.create({
  optionIcon: {
    color: COLORS.primary400,
    fontSize: SIZES.m24,
  },
  optionsButton: {
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    paddingHorizontal: SIZES.m24,
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
