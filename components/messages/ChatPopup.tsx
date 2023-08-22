import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { DocumentNode, useMutation } from '@apollo/client';

import Button from '../ui/Button';
import { showToast } from '../../utils/showToast';
import { COLORS, SCALE, SIZES } from '../../constants/theme';

type popupDataType = {
  title: string;
  description: string;
  cancelText: string;
  successToast: string;
  errorToast: string;
};

interface ChatPopupProps {
  // visible: boolean;
  onClose: () => void;
  popupData: popupDataType;
  variables: object;
  mutation: DocumentNode;
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  // visible,
  onClose,
  popupData,
  variables,
  mutation,
}) => {
  const [runMutation] = useMutation(mutation, {
    onCompleted: () => {
      showToast(popupData.successToast);
      onClose();
    },
    onError: (error) => {
      showToast(popupData.errorToast);
      console.error(error);
      onClose();
    },
  });

  const handleYes = async () => {
    runMutation({ variables });
  };

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={onClose}>
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
    height: SIZES.s36,
    marginLeft: SIZES.m10,
    width: SCALE(100),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SIZES.m24,
  },
  description: {
    color: COLORS.black,
    fontSize: SIZES.f14,
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
    fontWeight: '600',
  },
});
