import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { COLORS, SCALE, SIZES } from '../../constants/theme';
import { Picker } from '@react-native-picker/picker';
import { GET_ALL_FLOWS } from '../../graphql/queries/Flows';
import { START_COLLECTION_FLOW, START_CONTACT_FLOW } from '../../graphql/mutations/Flows';
import { useMutation, useQuery } from '@apollo/client';
import Button from '../ui/Button';
import { showToast } from '../../utils/showToast';
interface FlowProps {
  id: string;
  conversationType: string;
  visible: boolean;
  onClose: () => void;
}
const StartFlowPopup: React.FC<FlowProps> = ({ id, conversationType, visible, onClose }) => {
  const [selectedFlow, setSelectedFlow] = useState('');

  const isContactType = conversationType == 'contact';
  const [startFlowMutation] = useMutation(
    isContactType ? START_CONTACT_FLOW : START_COLLECTION_FLOW
  );

  const flowVariable = {
    flowId: selectedFlow,
    ...(isContactType ? { contactId: id } : { groupId: id }),
  };

  const handleStartFlow = async () => {
    try {
      const { data } = await startFlowMutation({
        variables: flowVariable,
      });
      // Show toast message here
      showToast('Flow started successfully!');
    } catch (error) {
      showToast('Error starting flow!');
      console.error(error);
    }
    onClose();
  };
  const variables = {
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
    variables,
    fetchPolicy: 'cache-and-network',
  });
  if (error) {
    console.log(error);
  }
  interface FlowProp {
    [key: string]: string;
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
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.background}>
        <View style={styles.popupContainer}>
          <Text testID="header" style={styles.header}>
            Select Flow
          </Text>
          <View style={styles.picker}>
            <Picker
              testID="flow-picker"
              selectedValue={selectedFlow}
              onValueChange={(itemValue) => setSelectedFlow(itemValue)}
              mode="dropdown"
              prompt="Select a Flow"
            >
              <Picker.Item testID="placeholder" label="Select a Flow" value="" />
              {Object.entries(flowsDict).map(([name, value]) => (
                <Picker.Item testID={name} key={value} label={name} value={value} />
              ))}
            </Picker>
          </View>
          <View>
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
      </View>
    </Modal>
  );
};

export default StartFlowPopup;

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
    marginBottom: SIZES.m10,
  },
  picker: {
    borderColor: COLORS.black,
    borderRadius: 10,
    borderWidth: 1,
    height: 60,
    width: 270,
  },
  popupContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: SCALE(20),
    paddingVertical: SCALE(20),
    width: 330,
  },
});
