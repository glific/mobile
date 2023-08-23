import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, ScrollView } from 'react-native';

import { COLORS, SCALE, SIZES, Icon } from '../../constants';

interface OptionType {
  id: string;
  name?: string;
  label?: string;
}

interface Props {
  testID?: string;
  options: OptionType[];
  selectedOptions: OptionType[];
  // eslint-disable-next-line no-unused-vars
  onSelectOption: (options: OptionType[]) => void;
  label: string;
  placeHolder: string;
  allowDeleteOption?: boolean;
  initialSelections?: OptionType[];
}

const MultiSelect: React.FC<Props> = ({
  testID,
  options,
  selectedOptions,
  onSelectOption,
  label = 'Select',
  placeHolder = 'Select option',
  allowDeleteOption = true,
  initialSelections = [],
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOptionPress = (option: OptionType) => {
    const isInitiallySelected = initialSelections.some((o) => o.id === option.id);

    if (isInitiallySelected) {
      return; // Do nothing if it's an initially selected option
    }

    const isSelected = selectedOptions.some((o) => o.id === option.id);

    if (isSelected) {
      const updatedOptions = selectedOptions.filter((o) => o.id !== option.id);
      onSelectOption(updatedOptions);
    } else {
      const updatedOptions = [...selectedOptions, option];
      onSelectOption(updatedOptions);
    }
  };

  const handleTagRemove = (option: OptionType) => {
    const updatedOptions = selectedOptions.filter((o) => o.id !== option.id);
    onSelectOption(updatedOptions);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>
      <Pressable testID={testID} onPress={toggleModal} style={styles.dropdownButton}>
        {selectedOptions.length == 0 ? (
          <Text style={styles.placeholderText}>{placeHolder}</Text>
        ) : (
          <View style={styles.tagsContainer}>
            {selectedOptions.map((option) => (
              <Pressable
                key={option.id}
                style={({ pressed }) => [styles.tag, pressed && styles.tagPressed]}
                onPress={() => handleTagRemove(option)}
              >
                <Text style={styles.tagText}>{option.name ? option.name : option.label}</Text>
                {allowDeleteOption && <Icon name="cross" style={styles.tagCloseIcon} />}
              </Pressable>
            ))}
          </View>
        )}
        <Icon name="down-arrow" style={styles.dropIcon} />
      </Pressable>
      <Modal visible={isModalVisible} animationType="fade" transparent onRequestClose={toggleModal}>
        <Pressable testID="closeSelect" style={styles.modalBackdrop} onPress={toggleModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>{label}</Text>
            <ScrollView>
              {options?.map((option) => (
                <Pressable
                  key={option.id}
                  style={[
                    styles.optionButton,
                    selectedOptions.find((o) => o.id === option.id) && styles.optionButtonSelected,
                  ]}
                  onPress={() => handleOptionPress(option)}
                  android_ripple={{ color: COLORS.primary10 }}
                >
                  {selectedOptions.find((o) => o.id === option.id) ? (
                    <Icon name="shape-fill" style={styles.checkBoxIcon} />
                  ) : (
                    <Icon name="shape" style={styles.checkBoxIcon} />
                  )}
                  <Text style={styles.optionButtonText}>
                    {option.name ? option.name : option.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default MultiSelect;

const styles = StyleSheet.create({
  checkBoxIcon: {
    color: COLORS.primary100,
    fontSize: SIZES.f20,
    marginRight: SIZES.m8,
  },
  dropIcon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f18,
    includeFontPadding: false,
    marginTop: SIZES.m16,
  },
  dropdownButton: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    flexDirection: 'row',
    minHeight: SIZES.s48,
    paddingHorizontal: SIZES.m8,
  },
  label: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    marginBottom: SIZES.m8,
  },
  mainContainer: {
    marginVertical: SIZES.m8,
    width: '100%',
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r4,
    maxHeight: SIZES.s400,
    paddingVertical: SIZES.m6,
    width: SIZES.s328,
  },
  modalLabel: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    fontWeight: '500',
    paddingHorizontal: SIZES.m6,
    paddingVertical: SIZES.m4,
  },
  optionButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m12,
  },
  optionButtonSelected: {
    backgroundColor: COLORS.primary10,
  },
  optionButtonText: {
    color: COLORS.black,
    flex: 1,
    fontSize: SIZES.f14,
  },
  placeholderText: {
    alignSelf: 'center',
    color: COLORS.darkGray,
    flex: 1,
    fontSize: SIZES.f16,
  },
  tag: {
    alignItems: 'center',
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.r20,
    flexDirection: 'row',
    marginBottom: SIZES.m6,
    marginRight: SIZES.m6,
    paddingHorizontal: SIZES.m12,
    paddingVertical: SIZES.m8,
  },
  tagCloseIcon: {
    color: COLORS.primary70,
    fontSize: SIZES.f12,
  },
  tagPressed: {
    opacity: 0.7,
  },
  tagText: {
    color: COLORS.primary70,
    fontSize: SIZES.f12,
    fontWeight: '500',
    marginRight: SIZES.m6,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: SIZES.m6,
  },
});
