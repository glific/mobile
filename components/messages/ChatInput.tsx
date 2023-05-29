import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Keyboard } from 'react-native';
import { FontAwesome, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useMutation } from '@apollo/client';

import { COLORS, SCALE, SIZES } from '../../constants';
import { SEND_CONTACT_MESSAGE } from '../../graphql/queries/Contact';

const ChatInput = ({ reply, closeReply, contact }: any) => {
  const [message, setMessage] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [createAndSendMessage] = useMutation(SEND_CONTACT_MESSAGE);

  const HandleSendMessage = async () => {
    try {
      if (message != '') {
        const response = await createAndSendMessage({
          variables: {
            input: {
              body: message,
              flow: 'OUTBOUND',
              type: 'TEXT',
              receiverId: contact.id,
            },
          },
        });
        console.log(response.data.createAndSendMessage.message);
        setMessage('');
        Keyboard.dismiss();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

        <Pressable style={styles.sendButton} onPress={HandleSendMessage}>
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
  closeReply: {
    color: COLORS.black,
    fontSize: SIZES.f20,
    position: 'absolute',
    right: SIZES.m10,
    top: SIZES.m4,
  },
  emoticonButton: {
    color: COLORS.black,
    fontSize: SIZES.s24,
    marginLeft: SCALE(2),
    padding: SIZES.m6,
  },
  iconchatbox: {
    color: COLORS.white,
    fontSize: SIZES.s30,
    position: 'absolute',
  },
  input: {
    color: COLORS.black,
    flex: 1,
    fontSize: SIZES.f16,
    minHeight: SIZES.s48,
    paddingHorizontal: SIZES.m6,
    paddingVertical: SIZES.m4,
  },
  inputAndEmoji: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SCALE(30),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m4,
    paddingVertical: SIZES.m10,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    bottom: 0,
    elevation: 14,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  optionIcon: {
    color: COLORS.primary400,
    fontSize: SIZES.m24,
  },
  optionsContainer: {
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
  paperclipicon: {
    color: COLORS.black,
    fontSize: SIZES.s24,
    marginRight: SCALE(2),
    padding: SIZES.m6,
    transform: [{ rotate: '50deg' }],
  },
  reply: {
    fontSize: SIZES.f14,
    marginTop: 5,
  },
  replyContainer: {
    alignItems: 'flex-start',
    backgroundColor: COLORS.primary10,
    borderRadius: 10,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary100,
    borderRadius: SIZES.m24,
    flexDirection: 'row',
    height: SIZES.s48,
    justifyContent: 'center',
    marginLeft: SCALE(2),
    width: SIZES.s48,
  },
  sendicon: {
    color: COLORS.primary100,
    fontSize: SIZES.f16,
    marginBottom: SIZES.m4,
  },
  showIcon: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    padding: SIZES.m6,
  },
  title: {
    fontSize: SIZES.f14,
    fontWeight: 'bold',
  },
});

export default ChatInput;
