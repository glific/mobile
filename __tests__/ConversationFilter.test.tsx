import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import ConversationFilter from '../screens/ConversationFilter';
import { GET_OPTIONS_MOCK } from '../__mocks__/queries/contact';

const navigationMock = { goBack: jest.fn() };
const routeMock = {
  params: {
    onGoBack: jest.fn(),
  },
};

describe('ConversationFilter', () => {
  test('renders all input fields and buttons', () => {
    const { getByText, getByTestId } = customRender(
      <ConversationFilter route={routeMock} />,
      GET_OPTIONS_MOCK
    );

    const labelInput = getByTestId('labelInput');
    const labelSelect = getByTestId('labelSelect');
    const collectionSelect = getByTestId('collectionSelect');
    const staffSelect = getByTestId('staffSelect');
    const dateFromPick = getByTestId('fromPick');
    const dateToPick = getByTestId('toPick');

    expect(labelInput).toBeDefined();
    expect(labelSelect).toBeDefined();
    expect(collectionSelect).toBeDefined();
    expect(staffSelect).toBeDefined();
    expect(dateFromPick).toBeDefined();
    expect(dateToPick).toBeDefined();

    const cancelButton = getByText('CANCEL');
    const applyButton = getByText('SEARCH');

    expect(cancelButton).toBeDefined();
    expect(applyButton).toBeDefined();
  });

  test('should update when label input change', () => {
    const { getByTestId } = customRender(
      <ConversationFilter route={routeMock} />,
      GET_OPTIONS_MOCK
    );

    const labelInput = getByTestId('labelInput');
    fireEvent.changeText(labelInput, 'John Doe');

    expect(labelInput.props.value).toBe('John Doe');
  });

  test('should update state when multi-select options change', async () => {
    const { getByTestId, getByText, queryByText, queryByTestId } = customRender(
      <ConversationFilter navigation={navigationMock} route={routeMock} />,
      GET_OPTIONS_MOCK
    );

    // Update labels multi-select
    const labelSelect = getByTestId('labelSelect');
    expect(labelSelect).toBeDefined();
    fireEvent.press(labelSelect);

    await waitFor(() => {
      const closeSelect = queryByTestId('closeSelect');
      const flowLabel = queryByText('Flow 1');
      expect(flowLabel).toBeDefined();

      fireEvent.press(flowLabel);
      fireEvent.press(closeSelect);
    });

    // Update collections multi-select
    const collectionSelect = getByTestId('collectionSelect');
    expect(collectionSelect).toBeDefined();
    fireEvent.press(collectionSelect);

    await waitFor(() => {
      const closeSelect = queryByTestId('closeSelect');
      const collectionLabel = queryByText('Group 1');
      expect(collectionLabel).toBeDefined();

      fireEvent.press(collectionLabel);
      fireEvent.press(closeSelect);
    });

    // Update staffs multi-select
    const staffSelect = getByTestId('staffSelect');
    expect(staffSelect).toBeDefined();
    fireEvent.press(staffSelect);

    await waitFor(() => {
      const closeSelect = queryByTestId('closeSelect');
      const staffLabel1 = queryByText('User 1');
      const staffLabel2 = queryByText('User 2');
      const staffLabel3 = queryByText('User 3');
      expect(staffLabel1).toBeDefined();

      fireEvent.press(staffLabel1);
      fireEvent.press(staffLabel2);
      fireEvent.press(staffLabel1);
      fireEvent.press(staffLabel3);
      fireEvent.press(closeSelect);
    });

    const staffLabel3 = queryByText('User 3');
    fireEvent.press(staffLabel3);

    const applyButton = getByText('SEARCH');
    fireEvent.press(applyButton);
    expect(navigationMock.goBack).toHaveBeenCalled();
  });

  test('should select date', async () => {
    const { getByTestId } = customRender(
      <ConversationFilter route={routeMock} />,
      GET_OPTIONS_MOCK
    );

    const dateFrom = getByTestId('fromPick');
    const dateTo = getByTestId('toPick');

    fireEvent.press(dateFrom, dateTo);
    await act(async () => {
      fireEvent(dateFrom, 'onChange', {
        nativeEvent: { timestamp: '10/01/1976' },
      });
    });
    await act(async () => {
      fireEvent(dateTo, 'onChange', {
        nativeEvent: { timestamp: '14/01/1976' },
      });
    });
  });

  test('calls the appropriate callbacks when buttons are pressed', () => {
    const { getByText } = customRender(
      <ConversationFilter navigation={navigationMock} route={routeMock} />,
      GET_OPTIONS_MOCK
    );

    const cancelButton = getByText('CANCEL');

    fireEvent.press(cancelButton);
    expect(navigationMock.goBack).toHaveBeenCalled();
  });
});
