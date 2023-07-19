import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';

import Button from '../ui/Button';
import { showToast } from '../../utils/showToast';
import { COLORS, SCALE, SIZES } from '../../constants/theme';
import { TERMINATE_FLOW } from '../../graphql/mutations/Flows';
import { CLEAR_MESSAGES } from '../../graphql/mutations/Chat';
import { BLOCK_CONTACT } from '../../graphql/mutations/Contact';

interface ChatPopupProps {
  id: string;
  visible: boolean;
  task: string;
  onClose: () => void;
}

type PopupDataType = {
  title: string;
  description: string;
  cancelText: string;
  successToast: string;
  errorToast: string;
};

const getPopupData = (task: string) => {
  switch (task) {
    case 'terminate':
      return {
        title: 'Terminate Flows!',
        description:
          'All active flows for the contact will be stopped. They can initiate a flow via keyword or you will need to do it manually.',
        cancelText: 'CANCEL',
        successToast: 'Flow terminated successfully!',
        errorToast: 'Error terminating flow!',
      };
    case 'clear':
      return {
        title: 'Are you sure you want to clear all conversation for this contact?',
        description:
          'All the conversation data for this contact will be deleted permanently from Glific. This action cannot be undone. However, you should be able to access it in reports if you have backup configuration enabled.',
        cancelText: 'CANCEL',
        successToast: 'Conversation cleared successfully!',
        errorToast: 'Error clearing conversation!',
      };
    case 'block':
      return {
        title: 'Do you want to block this contact?',
        description: 'You will not be able to view their chats and interact with them again.',
        cancelText: 'CANCEL',
        successToast: 'Contact blocked successfully!',
        errorToast: 'Error blocking contact!',
      };
    default:
      return {
        title: 'Alert',
        description: '',
        cancelText: 'CANCEL',
        successToast: '',
        errorToast: '',
      };
  }
};

const ChatPopup: React.FC<ChatPopupProps> = ({ id, visible, task, onClose }) => {
  const popupData: PopupDataType = getPopupData(task);
  const [runMutation] = useMutation(
    task === 'terminate' ? TERMINATE_FLOW : task === 'block' ? BLOCK_CONTACT : CLEAR_MESSAGES,
    {
      onCompleted: () => {
        showToast(popupData.successToast);
        onClose();
      },
      onError: (error) => {
        showToast(popupData.errorToast);
        console.error(error);
        onClose();
      },
    }
  );

  const handleYes = async () => {
    const variables = {
      contactId: id,
      ...(task === 'block' ? { input: { status: 'BLOCKED' } } : {}),
    };
    runMutation({ variables });
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.background}>
        <View testID="chatPopup" style={styles.popupContainer}>
          <Text testID="popupTitle" style={styles.title}>
            {popupData.title}
          </Text>
          <Text testID="popupBody" style={styles.description}>
            {popupData.description}
          </Text>
          <View style={styles.buttonContainer}>
            <View testID="cancelButton" style={styles.button}>
              <Button type="neutral" onPress={onClose}>
                <Text>{popupData.cancelText}</Text>
              </Button>
            </View>
            <View testID="yesButton" style={styles.button}>
              <Button type="negative" onPress={handleYes}>
                <Text>YES</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChatPopup;

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: COLORS.black08,
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: SIZES.s40,
    marginLeft: SIZES.m10,

    width: SCALE(90),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SIZES.m24,
  },
  description: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    letterHeight: SIZES.f16,
  },
  popupContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r10,
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m20,
    rowGap: SIZES.m16,
    width: SIZES.s328,
  },
  title: {
    color: COLORS.black,
    fontSize: SIZES.f18,
    fontWeight: '700',
  },
});
