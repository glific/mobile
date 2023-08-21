import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';

import Button from '../ui/Button';
import AuthContext from '../../config/AuthContext';
import { COLORS, SCALE, SIZES } from '../../constants/theme';

type TemplateType = {
  id: string;
  isHsm: boolean;
  body: string;
  type: string;
  numberParameters: number;
};

type FieldType = {
  label: string;
  key: string;
  name: string;
  value_type: string;
};

type CompletionType = {
  help: string;
  key: string;
  type: string;
};

interface TemplateVariablesPopupProps {
  onCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  onDone: (variables: string[]) => void;
  selectedTemplate: TemplateType | undefined;
}

const TemplateVariablesPopup: React.FC<TemplateVariablesPopupProps> = ({
  onCancel,
  onDone,
  selectedTemplate,
}) => {
  const { token, org } = useContext(AuthContext);
  const [variables, setVariables] = useState<string[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [options, setOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const glificBase = org.url.slice(0, -3) + 'flow-editor/';
  const contactFieldsprefix = '@contact.fields.';
  const contactVariablesprefix = '@contact.';
  const headers = { authorization: token };

  useEffect(() => {
    const getVariableOptions = async () => {
      try {
        const [fieldsData, contactData] = await Promise.all([
          axios.get(`${glificBase}fields`, { headers }),
          axios.get(`${glificBase}completion`, { headers }),
        ]);

        const fields = fieldsData.data.results.map((i: FieldType) =>
          contactFieldsprefix.concat(i.key)
        );

        const properties = contactData.data.context.types[5];
        const contacts = properties.properties
          .map((i: CompletionType) => contactVariablesprefix.concat(i.key))
          .concat(fields)
          .slice(1);

        setOptions(contacts);
      } catch (error) {
        console.error('Error fetching variable options:', error);
      }
    };

    getVariableOptions();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      const array = [];
      for (let i = 0; i < selectedTemplate.numberParameters; i++) {
        array.push('');
      }
      setVariables(array);
    }
  }, [selectedTemplate]);

  const handleVariableChange = (value: string) => {
    if (errorMessage !== '') setErrorMessage('');
    const newArray = [...variables];
    newArray[activeTab] = value;
    setVariables(newArray);
  };

  const handleSubmit = () => {
    if (variables.some((str) => str.trim() === '')) {
      setErrorMessage('Please fill all the variables.');
    } else {
      onDone(variables);
    }
  };

  return (
    <Modal visible animationType="fade" transparent={true} onRequestClose={onCancel}>
      <View style={styles.background}>
        <View testID="TemplateVariablesPopup" style={styles.popupContainer}>
          <Text testID="popupTitle" style={styles.title}>
            Select variables for the message
          </Text>
          <Text testID="popupBody" style={styles.description}>
            {selectedTemplate?.body}
          </Text>
          {selectedTemplate && selectedTemplate.numberParameters > 0 && (
            <>
              <View style={styles.variablesTab}>
                {variables.map((value, index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.variableButton,
                      activeTab === index && styles.activeTab,
                      value !== '' && activeTab !== index && styles.completeTab,
                    ]}
                    onPress={() => setActiveTab(index)}
                  >
                    <Text style={styles.tabText}>V{index + 1}</Text>
                  </Pressable>
                ))}
              </View>

              <TextInput
                testID={`variableInput_${activeTab + 1}`}
                style={styles.textInput}
                value={variables[activeTab]}
                onChangeText={(text) => handleVariableChange(text)}
                onFocus={() => setMenuVisible(true)}
                onBlur={() => setMenuVisible(false)}
                placeholder={`Variable {{${activeTab + 1}}}`}
                cursorColor={COLORS.darkGray}
                selectionColor={COLORS.darkGray}
                underlineColorAndroid="transparent"
              />
              {menuVisible && (
                <ScrollView style={styles.menuContainer}>
                  {options
                    .filter((opt) => opt.includes(variables[activeTab]))
                    .map((opt) => (
                      <Pressable
                        key={opt}
                        style={styles.menu}
                        onPress={() => {
                          handleVariableChange(opt);
                          setMenuVisible(false);
                        }}
                      >
                        <Text style={styles.menuText}>{opt}</Text>
                      </Pressable>
                    ))}
                </ScrollView>
              )}
            </>
          )}
          {errorMessage !== '' && <Text style={styles.errorLabel}>{errorMessage}</Text>}
          <View style={styles.buttonContainer}>
            <View testID="cancelButton" style={styles.button}>
              <Button type="neutral" onPress={onCancel}>
                <Text>CANCEL</Text>
              </Button>
            </View>
            <View testID="yesButton" style={styles.button}>
              <Button type="positive" onPress={handleSubmit}>
                <Text>DONE</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TemplateVariablesPopup;

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: COLORS.primary10,
  },
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
  completeTab: {
    backgroundColor: COLORS.primary100,
  },
  description: {
    color: COLORS.black,
    fontSize: SIZES.f14,
  },
  errorLabel: {
    color: COLORS.error100,
    fontSize: SIZES.f12,
  },
  menu: {
    justifyContent: 'center',
    padding: SIZES.m10,
    width: '100%',
  },
  menuContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    bottom: SCALE(150),
    marginTop: SIZES.m4,
    maxHeight: SCALE(170),
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  menuText: {
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    includeFontPadding: false,
  },
  popupContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r10,
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m20,
    rowGap: SIZES.m16,
    width: SIZES.s328,
  },
  tabText: {
    color: COLORS.black,
    fontSize: SIZES.f12,
    fontWeight: '500',
  },
  textInput: {
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    height: SIZES.s48,
    paddingHorizontal: SIZES.m10,
  },
  title: {
    color: COLORS.black,
    fontSize: SIZES.f18,
    fontWeight: '600',
  },
  variableButton: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.r4,
    height: SIZES.s30,
    justifyContent: 'center',
    marginRight: SIZES.m8,
    width: SIZES.s30,
  },
  variablesTab: {
    flexDirection: 'row',
  },
});
