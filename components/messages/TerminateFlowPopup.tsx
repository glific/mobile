import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Button from '../ui/Button';
import { COLORS, SCALE } from '../../constants/theme';
import { useMutation } from '@apollo/client';
import { TERMINATE_FLOW } from '../../graphql/mutations/Flows';
import { showToast } from '../../utils/showToast';

interface TerminateFlowProps {
  id: string;
  visible: boolean;
  onClose: () => void;
}

const TerminateFlowPopup: React.FC<TerminateFlowProps> = ({ id, visible, onClose }) => {
  const [terminateFlowMutation] = useMutation(TERMINATE_FLOW);

  const handleTerminateFlow = async () => {
    try {
      const { data } = await terminateFlowMutation({
        variables: { contactId: id },
      });

    //   showToast('Flow terminated successfully!');
    } catch (error) {
    //   showToast('Error terminating flow!');
      console.error(error);
    }
    onClose();
  };

  return (
    <Modal
      testID="popup"
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.background}>
        <View style={styles.popupContainer}>
          <Text testID="header" style={styles.header}>
            Terminate flows!
          </Text>
          <Text style={styles.description}>
            All active flows for the contact will be stopped. They can initiate a flow via keyword
            or you will need to do it manually.
          </Text>
          <View style={styles.buttonContainer}>
            <View testID="cancelButton" style={styles.button}>
              <Button type="neutral" onPress={onClose}>
                <Text>CANCEL</Text>
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

export default TerminateFlowPopup;

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
    height: 220,
    paddingHorizontal: SCALE(30),
    paddingVertical: SCALE(40),
    width: 330,
  },
});
