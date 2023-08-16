import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Pressable, Keyboard, Animated } from 'react-native';
import { useMutation } from '@apollo/client';

import Templates from './Templates';
import ErrorAlert from '../ui/ErrorAlert';
import MessageOptions from './MessageOptions';
import EmojiPicker from '../emojis/EmojiPicker';
import InteractiveMessage from './InteractiveMessage';
import { COLORS, SCALE, SIZES, Icon } from '../../constants';
import TemplateVariablesPopup from './TemplateVariablesPopup';
import { SEND_COLLECTION_MESSAGE, SEND_CONTACT_MESSAGE } from '../../graphql/mutations/Chat';

type InteractiveTemplateType = {
  id: string;
  body: string;
  type: string;
};

type TemplateType = {
  id: string;
  isHsm: boolean;
  body: string;
  type: string;
  numberParameters: number;
};

interface ChatInputProps {
  id: number;
  conversationType: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ conversationType, id }) => {
  const inputRef = useRef<TextInput>(null);
  const speedSendRef = useRef(null);
  const templateRef = useRef(null);
  const interactiveMessageRef = useRef(null);
  const xValue = useRef(new Animated.Value(0)).current;
  const [prevX, setPrevX] = useState(0);

  const [message, setMessage] = useState('');
  const [cursor, setcursor] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [showOptions, setShowOptions] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  const [interactiveTemplate, setInteractiveTemplate] = useState<InteractiveTemplateType>();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>();
  const [variableParam, setVariableParam] = useState<string[] | []>([]);
  const [variablePopupVisible, setVariablePopupVisible] = useState(false);

  const [createAndSendMessage] = useMutation(SEND_CONTACT_MESSAGE, {
    onError: (error) => {
      console.log(error);
      setErrorMessage(error.message);
      setInterval(() => {
        setErrorMessage('');
      }, 4000);
    },
  });

  const [createAndSendToCollection] = useMutation(SEND_COLLECTION_MESSAGE, {
    onError: (error) => {
      setErrorMessage(error.message);
      setInterval(() => {
        setErrorMessage('');
      }, 4000);
    },
  });

  const HandleSendMessage = () => {
    Keyboard.dismiss();
    setShowOptions(false);
    setShowEmoji(false);
    inputRef?.current?.blur();
    setShowAttachments(false);

    const input = {
      body: message,
      flow: 'OUTBOUND',
      type: 'TEXT',
      receiverId: id,
      mediaId: null,
    };

    if (interactiveTemplate) {
      input.type = interactiveTemplate.type;
      input.interactiveTemplateId = parseInt(interactiveTemplate.id, 10);
    } else if (selectedTemplate) {
      input.body = selectedTemplate.body;
      input.type = selectedTemplate.type;
      input.isHsm = selectedTemplate.isHsm;
      input.templateId = parseInt(selectedTemplate.id, 10);
      input.params = variableParam;
    }

    if (message !== '' || interactiveTemplate) {
      if (conversationType === 'contact') {
        createAndSendMessage({
          variables: { input },
        });
      } else {
        createAndSendToCollection({
          variables: { groupId: id, input },
        });
      }
    }

    setMessage('');
    setSelectedTemplate(undefined);
    setVariableParam([]);
    setInteractiveTemplate(undefined);
  };

  useEffect(() => {
    const translateX = message ? 100 : 0;
    if (prevX !== translateX) {
      setPrevX(translateX);
      Animated.timing(xValue, {
        toValue: translateX,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [message]);

  const handleTemplateSelect = (template: TemplateType, isTemplate: boolean) => {
    setShowOptions(false);
    setSelectedTemplate(template);
    setMessage(template.body);
    if (isTemplate) {
      setVariablePopupVisible(true);
    }
  };

  const handleInteractiveTemplateSelect = (template: InteractiveTemplateType) => {
    setShowOptions(false);
    setInteractiveTemplate(template);
  };

  const handleTemplateVariableCancel = () => {
    setMessage('');
    setSelectedTemplate(undefined);
    setVariablePopupVisible(false);
  };

  const handleTemplateVariableDone = (variables: string[]) => {
    setVariableParam(variables);
    const updatedBody = message.replace(/\{\{(\d+)\}\}/g, (_, index) => variables[index - 1]);
    setMessage(updatedBody);
    setVariablePopupVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.inputAndEmoji}>
          {showEmoji ? (
            <Icon
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
            <Icon
              testID="emojiIcon"
              name={'smiling-face'}
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
            value={interactiveTemplate ? interactiveTemplate.body : message}
            editable={!(selectedTemplate || interactiveTemplate?.id)}
            onChangeText={setMessage}
            onFocus={() => {
              setShowEmoji(false);
            }}
            onSelectionChange={(event) => {
              setcursor(event?.nativeEvent?.selection.start);
            }}
            cursorColor={COLORS.darkGray}
            selectionColor={COLORS.darkGray}
          />
          {selectedTemplate || interactiveTemplate?.id ? (
            <Icon
              name="cross-circle"
              testID="clearIcon"
              color={COLORS.black}
              style={styles.emojiconButton}
              onPress={() => {
                setMessage('');
                setSelectedTemplate(undefined);
                setVariableParam([]);
                setInteractiveTemplate(undefined);
              }}
            />
          ) : (
            <Animated.View style={[styles.actionButtons, { transform: [{ translateX: xValue }] }]}>
              <Icon
                testID="upIcon"
                name="upper-arrow"
                style={[styles.showIcon, showOptions && { transform: [{ rotate: '180deg' }] }]}
                onPress={() => {
                  setShowEmoji(false);
                  setShowAttachments(false);
                  inputRef?.current?.blur();
                  setShowOptions((showOptions) => !showOptions);
                }}
              />
              <Icon
                testID="clipIcon"
                name="attachment"
                color={COLORS.black}
                style={styles.paperclipicon}
                onPress={() => {
                  setShowOptions(false);
                  setShowEmoji(false);
                  inputRef?.current?.blur();
                  setShowAttachments((showAttachments) => !showAttachments);
                }}
              />
            </Animated.View>
          )}
        </View>

        <Pressable testID="sendIcon" onPress={HandleSendMessage}>
          <Icon name="send" style={styles.sendicon} />
        </Pressable>
      </View>

      {/* Todo: The refs approach is making it overcomplicated. we should clean it up*/}
      {showOptions && (
        <View>
          <MessageOptions
            onSpeedSend={() => speedSendRef.current.show()}
            onTemplates={() => templateRef.current.show()}
            onInteractiveMessage={() => interactiveMessageRef.current.show()}
          />
          <Templates bsRef={speedSendRef} handleSelect={handleTemplateSelect} />
          <Templates bsRef={templateRef} handleSelect={handleTemplateSelect} isTemplates />
          <InteractiveMessage
            bsRef={interactiveMessageRef}
            handleSelect={handleInteractiveTemplateSelect}
          />
        </View>
      )}
      {variablePopupVisible && (
        <TemplateVariablesPopup
          onCancel={handleTemplateVariableCancel}
          onDone={handleTemplateVariableDone}
          selectedTemplate={selectedTemplate}
        />
      )}

      {showEmoji && (
        <View testID="emojisTab" style={styles.emojiPanel}>
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
              <Icon name="image" style={styles.attachmentIcon} />
            </Pressable>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Icon name="file-document" style={styles.attachmentIcon} />
            </Pressable>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Icon name="location-pin" style={styles.attachmentIcon} />
            </Pressable>
          </View>
          <View style={styles.attachmentInContainer}>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Icon name="folder-video" style={styles.attachmentIcon} />
            </Pressable>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Icon name="headphone" style={styles.attachmentIcon} />
            </Pressable>
            <Pressable style={styles.attachmentButton} android_ripple={{ borderless: false }}>
              <Icon name="microphone" style={styles.attachmentIcon} />
            </Pressable>
          </View>
        </View>
      )}

      {errorMessage !== '' && <ErrorAlert message={errorMessage} />}
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  actionButtons: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
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
    color: COLORS.primary100,
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
  emojiPanel: {
    height: SCALE(250),
    width: SIZES.width,
  },
  emojiconButton: {
    color: COLORS.black,
    fontSize: SIZES.s24,
    padding: SIZES.m6,
  },
  input: {
    color: COLORS.black,
    flex: 1,
    fontSize: SIZES.f16,
    marginLeft: SIZES.m2,
    marginRight: SIZES.m6,
    minHeight: SIZES.s48,
    paddingVertical: SIZES.m4,
  },
  inputAndEmoji: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.s30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.m4,
    overflow: 'hidden',
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
  paperclipicon: {
    color: COLORS.black,
    fontSize: SIZES.s24,
    marginRight: SIZES.m4,
    paddingHorizontal: SIZES.m4,
    paddingVertical: SIZES.m12,
  },
  sendicon: {
    color: COLORS.primary100,
    fontSize: SIZES.s44,
    includeFontPadding: false,
  },
  showIcon: {
    color: COLORS.black,
    fontSize: SIZES.f20,
    paddingHorizontal: SIZES.m4,
    paddingVertical: SIZES.m12,
  },
});
