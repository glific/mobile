import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import StartFlowPopup from '../components/messages/StartFlowPopup';
import customRender from '../utils/jestRender';

const contactProp = {
  id: '123',
  conversationType: 'contact',
  visible: true,
  onClose: jest.fn(),
};

describe('StartFlowPopup', () => {
  test('renders correctly', () => {
    const { getByTestId } = customRender(<StartFlowPopup {...contactProp} />);
    expect(getByTestId('header')).toBeDefined();
    expect(getByTestId('cancelButton')).toBeDefined();
    expect(getByTestId('startButton')).toBeDefined();
    expect(getByTestId('flow-picker')).toBeDefined();
  });

  test('calls onClose when cancel button is pressed', async () => {
    const { getByText } = customRender(<StartFlowPopup {...contactProp} />);
    fireEvent.press(getByText('CANCEL'));
    expect(contactProp.onClose).toHaveBeenCalled();
  });
});
