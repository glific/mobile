import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Keyboard } from 'react-native';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Foundation,
  Entypo,
} from '@expo/vector-icons';
import { useMutation } from '@apollo/client';

import { COLORS, SCALE, SIZES } from '../../constants';
import { SEND_CONTACT_MESSAGE } from '../../graphql/queries/Contact';
import EmojiPicker from '../emojis/EmojiPicker';
import SpeedSendBS from './SpeedSendBS';
import TemplatesBS from './TemplatesBS';
import InteractiveMessageBS from './InteractiveMessageBS';

interface ChatInputProps {
  contact: {
    id: number;
    name: string;
    lastMessageAt: string;
  };
}

const ChatInput: React.FC<ChatInputProps> = ({ contact }) => {
  const inputRef = useRef<TextInput>(null);
  const speedSendRef = useRef(null);
  const templateRef = useRef(null);
  const interactiveMessageRef = useRef(null);
  const [message, setMessage] = useState('');
  const [cursor, setcursor] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [showOptions, setShowOptions] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

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
      }, 4000);
    },
  });

  const HandleSendMessage = () => {
    setShowOptions(false);
    setShowEmoji(false);
    inputRef?.current?.blur();
    setShowAttachments(false);

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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Entypo
          testID="upIcon"
          name="chevron-up"
          style={[styles.showIcon, showOptions && { transform: [{ rotate: '180deg' }] }]}
          onPress={() => {
            setShowEmoji(false);
            setShowAttachments(false);
            inputRef?.current?.blur();
            setShowOptions(!showOptions);
          }}
        />
        <View style={styles.inputAndEmoji}>
          {showEmoji ? (
            <MaterialCommunityIcons
              testID="keyboardIcon"
              name={'keyboard'}
              style={styles.emojiconButton}
              onPress={() => {
                setShowOptions(false);
                setShowEmoji(false);
                setShowAttachments(false);
                inputRef?.current?.focus();
              }}
            />
          ) : (
            <MaterialCommunityIcons
              testID="emojiIcon"
              name={'emoticon-outline'}
              style={styles.emojiconButton}
              onPress={() => {
                setShowOptions(false);
                setShowAttachments(false);
                inputRef?.current?.blur();
                setShowEmoji(true);
              }}
            />
          )}
          <TextInput
            testID="chatInput"
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
            testID="paperClipIcon"
            name="paperclip"
            size={23}
            color={COLORS.black}
            style={styles.paperclipicon}
            onPress={() => {
              setShowOptions(false);
              setShowEmoji(false);
              inputRef?.current?.blur();
              setShowAttachments(!showAttachments);
            }}
          />
        </View>

        <Pressable testID="sendIcon" style={styles.sendButton} onPress={HandleSendMessage}>
          <Ionicons name="chatbox-sharp" style={styles.iconchatbox} />
          <FontAwesome name="send" style={styles.sendicon} />
        </Pressable>
      </View>

      {showOptions && (
        <View testID="optionsTab">
          <Pressable
            style={styles.optionsButton}
            android_ripple={{ borderless: false }}
            onPress={() => speedSendRef.current.show()}
          >
            <MaterialCommunityIcons name="message-flash" style={styles.optionIcon} />
            <Text style={styles.optionsText}>Speed sends</Text>
          </Pressable>
          <Pressable
            style={styles.optionsButton}
            android_ripple={{ borderless: false }}
            onPress={() => templateRef.current.show()}
          >
            <MaterialCommunityIcons name="message-star" style={styles.optionIcon} />
            <Text style={styles.optionsText}>Templates</Text>
          </Pressable>
          <Pressable
            style={styles.optionsButton}
            android_ripple={{ borderless: false }}
            onPress={() => interactiveMessageRef.current.show()}
          >
            <MaterialCommunityIcons name="gesture-tap-button" style={styles.optionIcon} />
            <Text style={styles.optionsText}>Interactive message</Text>
          </Pressable>

          <SpeedSendBS bsRef={speedSendRef} />
          <TemplatesBS bsRef={templateRef} />
          <InteractiveMessageBS bsRef={interactiveMessageRef} />
        </View>
      )}

      {showEmoji && (
        <View testID="emojisTab" style={styles.emojiContainer}>
          <EmojiPicker
            messageObj={{ set: setMessage, value: message }}
            cursor={{ set: setcursor, value: cursor }}
          />
        </View>
      )}

      {showAttachments && (
        <View testID="attachmentsTab" style={styles.attachmentsContainer}>
          <View style={styles.attachmentInContainer}>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Ionicons name="image-outline" style={styles.attachmentIcon} />
            </Pressable>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Ionicons name="document-attach-outline" style={styles.attachmentIcon} />
            </Pressable>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Ionicons name="location-outline" style={styles.attachmentIcon} />
            </Pressable>
          </View>
          <View style={styles.attachmentInContainer}>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Ionicons name="videocam-outline" style={styles.attachmentIcon} />
            </Pressable>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Foundation name="sound" style={styles.attachmentIcon} />
            </Pressable>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Ionicons name="mic-outline" style={styles.attachmentIcon} />
            </Pressable>
          </View>
        </View>
      )}

      {errorMessage !== '' && (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="close" style={styles.errorIcon} />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  attachmentButton: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary50,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.5),
    height: SIZES.s70,
    justifyContent: 'center',
    overflow: 'hidden',
    width: SCALE(104),
  },
  attachmentIcon: {
    color: COLORS.primary400,
    fontSize: SIZES.m24,
  },
  attachmentInContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attachmentsContainer: {
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.black005,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.5),
    bottom: SIZES.s60,
    elevation: 3,
    gap: SIZES.m6,
    marginBottom: SIZES.m16,
    marginHorizontal: SIZES.m10,
    padding: SIZES.m6,
    position: 'absolute',
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: SCALE(340),
  },
  emojiContainer: {
    height: SCALE(250),
    width: SIZES.width,
  },
  emojiconButton: {
    color: COLORS.black,
    fontSize: SIZES.s24,
    marginLeft: SCALE(2),
    padding: SIZES.m6,
  },
  errorContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.r4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: SIZES.s328,
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m6,
    position: 'absolute',
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    top: -SCALE(44),
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
