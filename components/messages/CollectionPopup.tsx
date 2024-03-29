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
  onClose: () => void;
  popupData: popupDataType;
  mutation: DocumentNode;
  allOptionsQuery: DocumentNode;
  selectedOptionQuery: DocumentNode;
  allOptionsVariables: object;
}

type FormattedOptionType = {
  id: string;
  name?: string;
  label?: string;
};

type GroupOptionType = {
  id: string;
  label: string;
  name: string;
  maskedPhone: string;
};

type ContactOptionType = {
  id: string;
  contact: {
    name: string;
    maskedPhone: string;
  };
};

const formatOptions = (
  data: GroupOptionType[] | ContactOptionType[],
  isContactType: boolean
): FormattedOptionType[] => {
  return data.map((element: GroupOptionType | ContactOptionType) => {
    const id = element.id;
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
  onClose,
  popupData,
  mutation,
  allOptionsQuery,
  selectedOptionQuery,
  allOptionsVariables,
}) => {
  const [allOptions, setAllOptions] = useState<FormattedOptionType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<FormattedOptionType[]>([]);
  const [deletedOptions, setDeletedOptions] = useState<FormattedOptionType[]>([]);
  const [initialSelected, setInitialSelected] = useState<FormattedOptionType[]>([]);

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

  const handleSelectCollection = (options: FormattedOptionType[]) => {
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

  const formatAllOptions = (data: { groups: GroupOptionType[]; contacts: ContactOptionType[] }) => {
    const options = formatOptions(isContactType ? data.groups : data.contacts, isContactType);
    setAllOptions(options);
  };

  const formatSelectedOptions = (data: {
    group: { group: { contacts: ContactOptionType[] } };
    contact: { contact: { groups: GroupOptionType[] } };
  }) => {
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

  const initialSelectionProp = isContactType ? {} : { initialSelections: initialSelected };

  return (
    <Modal
      testID="collectionPopup"
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
            {...initialSelectionProp}
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
