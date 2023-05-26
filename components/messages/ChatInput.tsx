import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { FontAwesome, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { COLORS, SCALE, SIZES } from '../../constants';

const ChatInput = ({ reply, closeReply }: any) => {
  const [message, setMessage] = useState('');
  const [showOptions, setShowOptions] = useState(true);

  const translateY = useSharedValue(0);

  useEffect(() => {
    if (showOptions) {
      translateY.value = withTiming(SCALE(170));
    } else {
      translateY.value = withTiming(0);
    }
  }, [showOptions]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.mainContainer, animatedStyle]}>
      {reply && (
        <View style={styles.replyContainer}>
          <MaterialCommunityIcons name="close" style={styles.closeReply} onPress={closeReply} />
          <Text style={styles.title}>Response to {reply.isLeft ? reply?.sender.id : 'Me'}</Text>
          <Text style={styles.reply}>
            {reply?.body.length > 50 ? reply?.body.slice(0, 40) + '...' : reply?.body}
          </Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <AntDesign
          name="up"
          style={[styles.showIcon, !showOptions && { transform: [{ rotate: '180deg' }] }]}
          onPress={() => setShowOptions(!showOptions)}
        />
        <View style={styles.inputAndEmoji}>
          <MaterialCommunityIcons name={'emoticon-outline'} style={styles.emoticonButton} />
          <TextInput
            multiline
            placeholder={'Start Typing...'}
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <MaterialCommunityIcons
            name="paperclip"
            size={23}
            color={COLORS.black}
            style={styles.paperclipicon}
          />
        </View>

        <Pressable style={styles.sendButton}>
          <Ionicons name="chatbox-sharp" style={styles.iconchatbox} />
          <FontAwesome name="send" style={styles.sendicon} />
        </Pressable>
      </View>
      <Pressable style={styles.optionsContainer} android_ripple={{ borderless: false }}>
        <MaterialCommunityIcons name="message-flash" style={styles.optionIcon} />
        <Text style={styles.optionsText}>Speed sends</Text>
      </Pressable>
      <Pressable style={styles.optionsContainer} android_ripple={{ borderless: false }}>
        <MaterialCommunityIcons name="message-star" style={styles.optionIcon} />
        <Text style={styles.optionsText}>Templates</Text>
      </Pressable>
      <Pressable style={styles.optionsContainer} android_ripple={{ borderless: false }}>
        <MaterialCommunityIcons name="gesture-tap-button" style={styles.optionIcon} />
        <Text style={styles.optionsText}>Interactive message</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 14,
  },
  replyContainer: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: COLORS.primary10,
  },
  closeReply: {
    fontSize: SIZES.f20,
    color: COLORS.black,
    position: 'absolute',
    right: SIZES.m10,
    top: SIZES.m4,
  },
  title: {
    fontSize: SIZES.f14,
    fontWeight: 'bold',
  },
  reply: {
    fontSize: SIZES.f14,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.m10,
    paddingHorizontal: SIZES.m4,
  },
  showIcon: {
    fontSize: SIZES.f16,
    color: COLORS.black,
    padding: SIZES.m6,
  },
  inputAndEmoji: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SCALE(30),
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightGray,
  },
  emoticonButton: {
    fontSize: SIZES.s24,
    color: COLORS.black,
    padding: SIZES.m6,
    marginLeft: SCALE(2),
  },
  input: {
    flex: 1,
    fontSize: SIZES.f16,
    minHeight: SIZES.s48,
    color: COLORS.black,
    paddingHorizontal: SIZES.m6,
    paddingVertical: SIZES.m4,
  },
  paperclipicon: {
    fontSize: SIZES.s24,
    color: COLORS.black,
    padding: SIZES.m6,
    marginRight: SCALE(2),
    transform: [{ rotate: '50deg' }],
  },
  iconchatbox: {
    fontSize: SIZES.s30,
    color: COLORS.white,
    position: 'absolute',
  },
  sendicon: {
    fontSize: SIZES.f16,
    color: COLORS.primary100,
    marginBottom: SIZES.m4,
  },
  sendButton: {
    height: SIZES.s48,
    width: SIZES.s48,
    borderRadius: SIZES.m24,
    backgroundColor: COLORS.primary100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: SCALE(2),
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: SIZES.m24,
    paddingVertical: SIZES.m16,
    borderBottomWidth: 0.2,
    borderColor: COLORS.darkGray,
  },
  optionIcon: {
    fontSize: SIZES.m24,
    color: COLORS.primary400,
  },
  optionsText: {
    marginLeft: SIZES.m16,
    fontSize: SIZES.f14,
    fontWeight: '500',
    includeFontPadding: false,
  },
});

export default ChatInput;
