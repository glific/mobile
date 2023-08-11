import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Pressable, Keyboard, Animated } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';

import { COLORS, SCALE, SIZES } from '../../constants';
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
  UPLOAD_MEDIA,
} from '../../graphql/mutations/Chat';

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
    setInputTab('');
    inputRef?.current?.blur();

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

  const [attachmentURL, setAttachmentURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<null | string>(null);
  const [verifying, setVerifying] = useState(false);
  // const [uploadDisabled] = useState(!uploadPermission);

  const [uploadMedia] = useMutation(UPLOAD_MEDIA, {
    onCompleted: (data) => {
      setAttachmentURL(data.uploadMedia);
      setUploading(false);
    },
    onError: () => {
      setFileName(null);
      setUploading(false);
      setErrorMessage('An error occured while uploading the file');
    },
  });

  const [createMediaMessage] = useMutation(CREATE_MEDIA_MESSAGE, {
    onCompleted: (data) => {
      if (data) {
        // onSendMessage(
        //   '',
        //   data.createMessageMedia.messageMedia.id,
        //   attachmentType,
        //   selectedTemplate,
        //   variableParam
        // );
        // setAttachmentAdded(false);
        // setAttachmentURL('');
        // setAttachmentType('');
        // resetVariable();
      }
    },
  });

  const handleAttachment = (attachment: string) => {
    console.log(attachment);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.inputAndEmoji}>
          {inputTab === 'emojis' ? (
            <MaterialCommunityIcons
              testID="keyboardIcon"
              name={'keyboard'}
              style={styles.emojiconButton}
              onPress={() => {
                setInputTab('');
                inputRef?.current?.focus();
              }}
            />
          ) : (
            <MaterialCommunityIcons
              testID="emojiIcon"
              name={'emoticon-outline'}
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
            <Ionicons
              name="close-circle-outline"
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
              <Entypo
                testID="upIcon"
                name="chevron-up"
                style={[
                  styles.showIcon,
                  inputTab === 'options' && { transform: [{ rotate: '180deg' }] },
                ]}
                onPress={() => {
                  inputRef?.current?.blur();
                  setInputTab(inputTab === 'options' ? '' : 'options');
                }}
              />
              <MaterialCommunityIcons
                testID="clipIcon"
                name="paperclip"
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

        <Pressable testID="sendIcon" style={styles.sendButton} onPress={HandleSendMessage}>
          <Ionicons name="chatbox-sharp" style={styles.iconchatbox} />
          <FontAwesome name="send" style={styles.sendicon} />
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
          <Templates bsRef={templateRef} handleSelect={handleTemplateSelect} isTemplates={true} />
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
      {inputTab === 'attachments' && <AttachmentOptions handleAttachment={handleAttachment} />}
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
  iconchatbox: {
    color: COLORS.white,
    fontSize: SIZES.s30,
    position: 'absolute',
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
    transform: [{ rotate: '50deg' }],
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary100,
    borderRadius: SIZES.m24,
    flexDirection: 'row',
    height: SIZES.s48,
    justifyContent: 'center',
    width: SIZES.s48,
  },
  sendicon: {
    color: COLORS.primary100,
    fontSize: SIZES.f14,
    includeFontPadding: false,
    marginBottom: SIZES.m4,
  },
  showIcon: {
    color: COLORS.black,
    fontSize: SIZES.f18,
    paddingHorizontal: SIZES.m4,
    paddingVertical: SIZES.m12,
  },
});
