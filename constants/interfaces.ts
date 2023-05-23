import { ReactElement } from 'react';
import { KeyboardTypeOptions } from 'react-native';

export interface Contacts {
  index: number;
  name: string | null;
}

export interface ContactProp {
  name: string | null;
}

export interface ButtonProps {
  children: ReactElement | string;
  onPress: () => void;
  disable?: boolean;
}

export interface InputProps {
  label: string;
  onUpdateValue: (text: string) => void;
  value: string;
  isError: boolean;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeHolder: string;
}
