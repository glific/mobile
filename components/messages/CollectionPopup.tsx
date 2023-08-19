import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { DocumentNode, useMutation, useQuery } from '@apollo/client';

import Button from '../ui/Button';
import { COLORS, SIZES, SCALE } from '../../constants';
import MultiSelect from '../ui/MultiSelect';
import { showToast } from '../../utils/showToast';

interface popupDataType {
  id: string;
  title: string;
  successToast: string;
  errorToast: string;
}

interface Props {
  isContactType: boolean;
  visible: boolean;
  onClose: () => void;
  popupData: popupDataType;
  mutation: DocumentNode;
  allOptionsQuery: DocumentNode;
  selectedOptionQuery: DocumentNode;
  allOptionsVariables: object;
}

interface OptionType {
  id: string;
  name?: string;
  label?: string;
}

const formatOptions = (
  data: any,
  isContactType: boolean
): { id: string; name: string; label: string }[] => {
  return data.map((element: any) => {
    const id = element.id || element.contact?.id;
    const contact = element.contact || {};

    const name = isContactType
      ? element.label
      : element.name || element.maskedPhone || contact.name || contact.maskedPhone;

    const label = isContactType ? 'Collections' : 'Contacts';

    return {
      id,
      name,
      label,
    };
  });
};

const CollectionPopup: React.FC<Props> = ({
  isContactType,
  visible,
  onClose,
  popupData,
  mutation,
  allOptionsQuery,
  selectedOptionQuery,
  allOptionsVariables,
}) => {
  const [allOptions, setAllOptions] = useState<OptionType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [deletedOptions, setDeletedOptions] = useState<OptionType[]>([]);
  const [initialSelected, setInitialSelected] = useState<OptionType[]>([]);

  const [AddMutation] = useMutation(mutation, {
    onCompleted() {
      showToast(popupData.successToast);
      onClose();
    },
    onError(error) {
      console.error(error);
      showToast(popupData.errorToast);
      onClose();
    },
  });
  const variable = isContactType
    ? {
        input: {
          contactId: popupData.id,
          addGroupIds: selectedOptions.map((option) => option.id),
          deleteGroupIds: deletedOptions.map((option) => option.id),
        },
      }
    : {
        input: {
          groupId: popupData.id,
          addContactIds: selectedOptions.map((option) => option.id),
          deleteContactIds: deletedOptions.map((option) => option.id),
        },
      };
  const handleAddition = async () => {
    AddMutation({
      variables: variable,
    });
  };

  const handleSelectCollection = (options: OptionType[]) => {
    // Identify options that were removed and options that were re-added
    const removedOptions = selectedOptions.filter(
      (selectedOption) => !options.some((newOption) => newOption.id === selectedOption.id)
    );
    const reAddedOptions = deletedOptions.filter((deletedOption) =>
      options.some((newOption) => newOption.id === deletedOption.id)
    );

    // Remove re-added options from deletedOptions
    const updatedDeletedOptions = deletedOptions.filter(
      (deletedOption) =>
        !reAddedOptions.some((reAddedOption) => reAddedOption.id === deletedOption.id)
    );

    // Update selectedOptions and deletedOptions states
    setSelectedOptions(options);
    setDeletedOptions([...updatedDeletedOptions, ...removedOptions]);
  };

  const formatAllOptions = (data: any) => {
    const options = formatOptions(isContactType ? data.groups : data.search, isContactType);
    setAllOptions(options);
  };

  const formatSelectedOptions = (data: any) => {
    const options = formatOptions(
      isContactType ? data.contact.contact.groups : data.group.group.contacts,
      isContactType
    );
    setInitialSelected(options);
    setSelectedOptions(options);
  };

  useQuery(allOptionsQuery, {
    variables: allOptionsVariables,
    onCompleted: formatAllOptions,
    nextFetchPolicy: 'network-only',
  });

  useQuery(selectedOptionQuery, {
    variables: { id: popupData.id },
    onCompleted: formatSelectedOptions,
    nextFetchPolicy: 'network-only',
  });

  return (
    <Modal
      testID="collectionPopup"
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.background}>
        <View style={styles.popupContainer}>
          <Text testID="header" style={styles.title}>
            {popupData.title}
          </Text>
          <MultiSelect
            testID="MultiSelect"
            options={allOptions}
            selectedOptions={selectedOptions}
            onSelectOption={handleSelectCollection}
            label={isContactType ? 'Select Collections' : 'Select Contacts'}
            placeHolder="Options"
            allowDeleteOption={isContactType}
            initialSelections={initialSelected}
          />
          <View style={styles.buttonContainer}>
            <View testID="cancelButton" style={styles.button}>
              <Button type="neutral" onPress={onClose}>
                <Text>CANCEL</Text>
              </Button>
            </View>
            <View testID="startButton" style={styles.button}>
              <Button onPress={handleAddition}>
                <Text>SAVE</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CollectionPopup;

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
