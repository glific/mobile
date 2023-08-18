import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { DocumentNode, useMutation, useQuery } from '@apollo/client';

import Button from '../ui/Button';
import { COLORS, SCALE, SIZES } from '../../constants/theme';
import { GET_ALL_FLOWS } from '../../graphql/queries/Flows';
import { Picker } from '@react-native-picker/picker';
import { showToast } from '../../utils/showToast';

interface FlowProps {
  onClose: () => void;
  variables: object;
  mutation: DocumentNode;
}

interface FlowProp {
  [key: string]: string;
}

const StartFlowPopup: React.FC<FlowProps> = ({ onClose, variables, mutation }) => {
  const [selectedFlow, setSelectedFlow] = useState('');

  const [startFlowMutation] = useMutation(mutation, {
    onCompleted() {
      showToast('Flow started successfully!');
      onClose();
    },
    onError(error) {
      console.log(error);
      showToast('Error starting flow!');
      onClose();
    },
  });

  const handleStartFlow = async () => {
    startFlowMutation({
      variables: { ...variables, flowId: selectedFlow },
    });
  };

  const getAllFlowsVariables = {
    filter: {
      status: 'published',
      isActive: true,
    },
    opts: {
      limit: null,
      offset: 0,
      order: 'ASC',
    },
  };

  const { error, data } = useQuery(GET_ALL_FLOWS, {
    variables: getAllFlowsVariables,
    fetchPolicy: 'cache-and-network',
  });
  if (error) {
    console.log(error);
  }

  const flowsDict: FlowProp = {};
  if (data) {
    data['flows'].map((item: FlowProp) => {
      const { name, id } = item;
      flowsDict[name] = id;
    });
  }

  return (
    <Modal
      testID="startFlowPopup"
      visible
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.background}>
        <View style={styles.popupContainer}>
          <Text testID="header" style={styles.title}>
            Select Flow
          </Text>
          <View style={styles.picker}>
            <Picker
              testID="flow-picker"
              mode="dialog"
              prompt="Select a Flow"
              selectedValue={selectedFlow}
              onValueChange={(itemValue) => setSelectedFlow(itemValue)}
              dropdownIconColor={COLORS.darkGray}
            >
              <Picker.Item testID="placeholder" label="Select a Flow" value="" />
              {Object.entries(flowsDict).map(([name, value]) => (
                <Picker.Item testID={name} key={value} label={name} value={value} />
              ))}
            </Picker>
          </View>
          <Text style={styles.description}>
            The contact will be responded as per the messages planned in the flow.
          </Text>
          <View style={styles.buttonContainer}>
            <View testID="cancelButton" style={styles.button}>
              <Button type="neutral" onPress={onClose}>
                <Text>CANCEL</Text>
              </Button>
            </View>
            <View testID="startButton" style={styles.button}>
              <Button onPress={handleStartFlow}>
                <Text>START</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StartFlowPopup;

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
  picker: {
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.5),
    height: SIZES.s50,
    justifyContent: 'center',
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
