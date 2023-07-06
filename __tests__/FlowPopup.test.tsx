import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import PopupModal from '../components/messages/FlowPopup';
import customRender from '../utils/jestRender';

const contactProp = {
  id: '123',
  conversationType: 'contact',
  visible: true,
  onClose: jest.fn(),
};

describe('PopupModal', () => {
  test('renders correctly', () => {
    const { getByTestId } = customRender(<PopupModal {...contactProp} />);
    expect(getByTestId('header')).toBeDefined();
    expect(getByTestId('cancelButton')).toBeDefined();
    expect(getByTestId('startButton')).toBeDefined();
    expect(getByTestId('flow-picker')).toBeDefined();
  });

  test('calls onClose when cancel button is pressed', async () => {
    const { getByText } = customRender(<PopupModal {...contactProp} />);
    fireEvent.press(getByText('CANCEL'));
    expect(contactProp.onClose).toHaveBeenCalled();
  });
});
