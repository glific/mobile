import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Pressable, Keyboard, Animated } from 'react-native';
import { useMutation } from '@apollo/client';

import { COLORS, SCALE, SIZES, Icon } from '../../constants';
import Templates from './Templates';
import ErrorAlert from '../ui/ErrorAlert';
import MessageOptions from './MessageOptions';
import EmojiPicker from '../emojis/EmojiPicker';
import AttachmentOptions from './AttachmentOptions';
import InteractiveMessage from './InteractiveMessage';
import TemplateVariablesPopup from './TemplateVariablesPopup';
import {
  CREATE_MEDIA_MESSAGE,
  SEND_COLLECTION_MESSAGE,
  SEND_CONTACT_MESSAGE,
} from '../../graphql/mutations/Chat';
import AttachmentSelected from './AttachmentSelected';

type MediaType = {
  name: string;
  url: string;
  type: string;
};

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

  const [inputTab, setInputTab] = useState('');
  const [message, setMessage] = useState('');
  const [cursor, setcursor] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [media, setMedia] = useState<MediaType>();
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

  const sendMessage = (mediaId: string | null) => {
    Keyboard.dismiss();
    setInputTab('');
    inputRef?.current?.blur();

    const input = {
      body: message,
      flow: 'OUTBOUND',
      type: 'TEXT',
      receiverId: id,
      mediaId: mediaId,
    };

    if (mediaId) {
      input.type = media.type;
      input.mediaId = mediaId;
    } else if (interactiveTemplate) {
      input.type = interactiveTemplate.type;
      input.interactiveTemplateId = parseInt(interactiveTemplate.id, 10);
    } else if (selectedTemplate) {
      input.body = selectedTemplate.body;
      input.type = selectedTemplate.type;
      input.isHsm = selectedTemplate.isHsm;
      input.templateId = parseInt(selectedTemplate.id, 10);
      input.params = variableParam;
    }

    if (message !== '' || media || interactiveTemplate) {
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
    setMedia(undefined);
    setSelectedTemplate(undefined);
    setVariableParam([]);
    setInteractiveTemplate(undefined);
  };

  const [createMediaMessage] = useMutation(CREATE_MEDIA_MESSAGE, {
    onCompleted: (data) => {
      if (data) {
        sendMessage(data.createMessageMedia.messageMedia.id);
      }
    },
  });

  const HandleSendMessage = () => {
    if (media) {
      createMediaMessage({
        variables: {
          input: {
            caption: message,
            sourceUrl: media.url,
            url: media.url,
          },
        },
      });
    } else {
      sendMessage(null);
    }
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
    setInputTab('');
    setSelectedTemplate(template);
    setMessage(template.body);
    if (isTemplate) {
      setVariablePopupVisible(true);
    }
  };

  const handleInteractiveTemplateSelect = (template: InteractiveTemplateType) => {
    setInputTab('');
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
      {media && (
        <AttachmentSelected
          name={media.name || media.url}
          type={media.type.toLowerCase()}
          remove={() => setMedia(undefined)}
        />
      )}
      <View style={styles.inputContainer}>
        <View style={styles.inputAndEmoji}>
          {inputTab === 'emojis' ? (
            <Icon
              testID="keyboardIcon"
              name={'keyboard'}
              style={styles.emojiconButton}
              onPress={() => {
                setInputTab('');
                inputRef?.current?.focus();
              }}
            />
          ) : (
            <Icon
              testID="emojiIcon"
              name={'smiling-face'}
              style={styles.emojiconButton}
              onPress={() => {
                inputRef?.current?.blur();
                setInputTab('emojis');
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
            onFocus={() => setInputTab('')}
            onSelectionChange={(event) => setcursor(event?.nativeEvent?.selection.start)}
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
                style={[
                  styles.showIcon,
                  inputTab === 'options' && { transform: [{ rotate: '180deg' }] },
                ]}
                onPress={() => {
                  inputRef?.current?.blur();
                  setInputTab(inputTab === 'options' ? '' : 'options');
                }}
              />
              <Icon
                testID="clipIcon"
                name="attachment"
                color={COLORS.black}
                style={styles.paperclipicon}
                onPress={() => {
                  inputRef?.current?.blur();
                  setInputTab(inputTab === 'attachments' ? '' : 'attachments');
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
      {inputTab === 'options' && (
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

      {inputTab === 'emojis' && (
        <View testID="emojisTab" style={styles.emojiPanel}>
          <EmojiPicker
            messageObj={{ set: setMessage, value: message }}
            cursor={{ set: setcursor, value: cursor }}
          />
        </View>
      )}
      {inputTab === 'attachments' && (
        <AttachmentOptions setMedia={setMedia} onClose={() => setInputTab('')} />
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
