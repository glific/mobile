import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';
import TerminateFlowPopup from '../components/messages/TerminateFlowPopup';
import { TERMINATE_FLOW_MOCK } from '../__mocks__/mutations/flows';

const terminateFlowProp = {
  id: '123',
  visible: true,
  onClose: jest.fn(),
};

describe('StartFlowPopup', () => {
  test('renders correctly', () => {
    const { getByTestId } = customRender(
      <TerminateFlowPopup {...terminateFlowProp} />,
      TERMINATE_FLOW_MOCK
    );
    expect(getByTestId('header')).toBeDefined();
    expect(getByTestId('cancelButton')).toBeDefined();
    expect(getByTestId('yesButton')).toBeDefined();
  });

  test('calls onClose when cancel button is pressed', async () => {
    const { getByText } = customRender(
      <TerminateFlowPopup {...terminateFlowProp} />,
      TERMINATE_FLOW_MOCK
    );
    fireEvent.press(getByText('CANCEL'));
    expect(terminateFlowProp.onClose).toHaveBeenCalled();
  });
  test('terminates a flow', async () => {
    const { getByText } = customRender(
      <TerminateFlowPopup {...terminateFlowProp} />,
      TERMINATE_FLOW_MOCK
    );
    const yesButton = getByText('YES');
    fireEvent.press(yesButton);

    fireEvent.press(getByText('YES'));
    await waitFor(() => {
      expect(terminateFlowProp.onClose).toHaveBeenCalled();
    });
  });
});
