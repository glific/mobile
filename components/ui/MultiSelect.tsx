import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, ScrollView } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SCALE, SIZES } from '../../constants';

interface Option {
  id: string;
  label: string;
}

interface Props {
  testID?: string;
  options: Option[];
  selectedOptions: Option[];
  onSelectOption: (options: Option[]) => void;
  label: string;
  placeHolder: string;
}

const MultiSelect: React.FC<Props> = ({
  testID,
  options,
  selectedOptions,
  onSelectOption,
  label = 'Select',
  placeHolder = 'Select option',
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOptionPress = (option: Option) => {
    const isSelected = selectedOptions.find((o) => o.id === option.id);
    if (isSelected) {
      // Remove the option from selected options
      const updatedOptions = selectedOptions.filter((o) => o.id !== option.id);
      onSelectOption(updatedOptions);
    } else {
      // Add the option to selected options
      const updatedOptions = [...selectedOptions, option];
      onSelectOption(updatedOptions);
    }
  };

  const handleTagRemove = (option: Option) => {
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
                <Text style={styles.tagText}>{option.label}</Text>
                <AntDesign name="close" style={styles.tagCloseIcon} />
              </Pressable>
            ))}
          </View>
        )}
        <AntDesign name="caretdown" style={styles.dropIcon} />
      </Pressable>
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <Pressable style={styles.modalBackdrop} onPress={toggleModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>{label}</Text>
            <ScrollView>
              {options.map((option) => (
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
                    <MaterialCommunityIcons name="checkbox-outline" style={styles.checkBoxIcon} />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      style={styles.checkBoxIcon}
                    />
                  )}
                  <Text style={styles.optionButtonText}>{option.label}</Text>
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
    color: COLORS.black,
    fontSize: SIZES.f20,
    marginRight: SIZES.m8,
  },
  dropIcon: {
    color: COLORS.black,
    fontSize: SIZES.f12,
    marginTop: SIZES.m18,
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
    paddingHorizontal: SIZES.m10,
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
    fontSize: SIZES.f16,
    width: '95%',
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
    color: COLORS.darkGray,
    fontSize: SIZES.f12,
  },
  tagPressed: {
    opacity: 0.7,
  },
  tagText: {
    color: COLORS.black,
    fontSize: SIZES.f12,
    fontWeight: '400',
    marginRight: SIZES.m6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.m6,
    width: '95%',
  },
});
