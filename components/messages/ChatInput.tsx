import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Keyboard } from 'react-native';
import { FontAwesome, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useMutation } from '@apollo/client';

import { COLORS, SCALE, SIZES } from '../../constants';
import { SEND_CONTACT_MESSAGE } from '../../graphql/queries/Contact';
import EmojiPicker from '../emojis/EmojiPicker';

interface ChatInputProps {
  contact: {
    id: number;
    name: string;
  };
}

const ChatInput: React.FC<ChatInputProps> = ({ contact }) => {
  const inputRef = useRef<TextInput>(null);

  const [message, setMessage] = useState('');
  const [cursor, setcursor] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [createAndSendMessage] = useMutation(SEND_CONTACT_MESSAGE, {
    onCompleted: (data) => {
      console.log(data.createAndSendMessage.message);
      setMessage('');
      Keyboard.dismiss();
    },
    onError: (error) => {
      Keyboard.dismiss();
      setErrorMessage(error.message);
      setInterval(() => {
        setErrorMessage('');
      }, 5000);
      // Handle error display or other actions as needed
    },
  });

  const HandleSendMessage = () => {
    if (message !== '') {
      createAndSendMessage({
        variables: {
          input: {
            body: message,
            flow: 'OUTBOUND',
            type: 'TEXT',
            receiverId: contact.id,
          },
        },
      });
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

  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <>
      <Animated.View style={[styles.mainContainer, animatedStyle]}>
        <View style={styles.inputContainer}>
          <AntDesign
            name="up"
            style={[styles.showIcon, !showOptions && { transform: [{ rotate: '180deg' }] }]}
            onPress={() => {
              setShowOptions(!showOptions);
            }}
          />
          <View style={styles.inputAndEmoji}>
            <MaterialCommunityIcons
              name={'emoticon-outline'}
              style={styles.emoticonButton}
              onPress={() => {
                setShowEmoji(!showEmoji);
                inputRef?.current?.blur();
              }}
            />
            <TextInput
              ref={inputRef}
              multiline
              placeholder={'Start Typing...'}
              style={styles.input}
              value={message}
              onChangeText={(text) => setMessage(text)}
              onFocus={() => {
                setShowEmoji(false);
              }}
              onSelectionChange={(event) => {
                setcursor(event?.nativeEvent?.selection.start);
              }}
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
        {showEmoji && (
          <View style={{ height: 300, width: '100%' }}>
            <EmojiPicker
              messageObj={{ set: setMessage, value: message }}
              cursor={{ set: setcursor, value: cursor }}
            />
          </View>
        )}
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
      {errorMessage && (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="close" style={styles.errorIcon} />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emoticonButton: {
    color: COLORS.black,
    fontSize: SIZES.s24,
    marginLeft: SCALE(2),
    padding: SIZES.m6,
  },
  errorContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SCALE(80),
    maxWidth: SIZES.s328,
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m6,
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  errorIcon: {
    color: COLORS.error100,
    fontSize: SIZES.f14,
    marginRight: SIZES.m10,
  },
  errorText: {
    color: COLORS.error100,
    fontSize: SIZES.f14,
    maxWidth: SIZES.s328,
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
});

export default ChatInput;
