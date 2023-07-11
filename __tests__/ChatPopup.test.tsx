import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';
import ChatPopup from '../components/messages/ChatPopup';
import { TERMINATE_FLOW_MOCK } from '../__mocks__/mutations/flows';
const chatPopupProp = {
  id: '123',
  visible: true,
  task: 'terminate',
  onClose: jest.fn(),
};

describe('ChatPopup', () => {
  test('renders correctly', () => {
    const { getByTestId } = customRender(<ChatPopup {...chatPopupProp} />, TERMINATE_FLOW_MOCK);
    expect(getByTestId('header')).toBeDefined();
    expect(getByTestId('cancelButton')).toBeDefined();
    expect(getByTestId('yesButton')).toBeDefined();
  });

  test('calls onClose when cancel button is pressed', async () => {
    const { getByText } = customRender(<ChatPopup {...chatPopupProp} />, TERMINATE_FLOW_MOCK);
    fireEvent.press(getByText('CANCEL'));
    expect(chatPopupProp.onClose).toHaveBeenCalled();
  });
  test('terminates a flow', async () => {
    const { getByText } = customRender(<ChatPopup {...chatPopupProp} />, TERMINATE_FLOW_MOCK);
    const yesButton = getByText('YES');
    fireEvent.press(yesButton);

    fireEvent.press(getByText('YES'));
    await waitFor(() => {
      expect(chatPopupProp.onClose).toHaveBeenCalled();
    });
  });
});
