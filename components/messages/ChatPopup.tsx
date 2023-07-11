import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Button from '../ui/Button';
import { COLORS, SCALE } from '../../constants/theme';
import { useMutation } from '@apollo/client';
import { TERMINATE_FLOW } from '../../graphql/mutations/Flows';
import { showToast } from '../../utils/showToast';
import { CLEAR_MESSAGES } from '../../graphql/mutations/Chat';

interface ChatPopupProps {
  id: string;
  visible: boolean;
  task: string;
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ id, visible, task, onClose }) => {
  const [terminateFlowMutation] = useMutation(
    task == 'terminate' ? TERMINATE_FLOW : CLEAR_MESSAGES
  );
  const header =
    task == 'terminate'
      ? 'Terminate Flows!'
      : 'Are you sure you want to clear all conversation for this contact?';
  const description =
    task == 'terminate'
      ? 'All active flows for the contact will be stopped. They can initiate a flow via keyword or you will need to do it manually.'
      : 'All the conversation data for this contact will be deleted permanently from Glific. This action cannot be undone. However, you should be able to access it in reports if you have backup configuration enabled.';
  const cancelText = task == 'terminate' ? 'CANCEL' : 'LATER';
  const successToast =
    task == 'terminate' ? 'Flow terminated successfully!' : 'Conversation cleared successfully!';
  const errorToast =
    task == 'terminate' ? 'Error terminating flow!' : 'Error clearing conversation!';

  const handleTerminateFlow = async () => {
    try {
      const { data } = await terminateFlowMutation({
        variables: { contactId: id },
      });

      showToast(successToast);
    } catch (error) {
      showToast(errorToast);
      console.error(error);
    }
    onClose();
  };

  return (
    <Modal
      testID="terminateFlowpopup"
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.background}>
        <View style={styles.popupContainer}>
          <Text testID="header" style={styles.header}>
            {header}
          </Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonContainer}>
            <View testID="cancelButton" style={styles.button}>
              <Button type="neutral" onPress={onClose}>
                <Text>{cancelText}</Text>
              </Button>
            </View>
            <View testID="yesButton" style={styles.button}>
              <Button type="negative" onPress={handleTerminateFlow}>
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
    backgroundColor: COLORS.black087,
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 40,
    marginHorizontal: 10,
    marginTop: 24,
    width: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  description: {
    color: COLORS.black,
    marginTop: 14,
  },
  header: {
    fontSize: 17,
    fontWeight: '500',
  },
  popupContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: SCALE(30),
    paddingVertical: SCALE(40),
    width: 330,
  },
});
