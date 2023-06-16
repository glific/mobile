import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import ConversationFilter from '../screens/ConversationFilter';
import renderWithAuth from '../utils/authProvider';

describe('ConversationFilter', () => {
  test('renders all input fields and buttons', () => {
    const { getByText, getByTestId } = renderWithAuth(<ConversationFilter />);

    const labelInput = getByTestId('labelInput');
    const labelSelect = getByTestId('labelSelect');
    const collectionSelect = getByTestId('collectionSelect');
    const staffSelect = getByTestId('staffSelect');
    const dateFromPick = getByTestId('dateFromPick');
    const dateToPick = getByTestId('dateToPick');

    expect(labelInput).toBeDefined();
    expect(labelSelect).toBeDefined();
    expect(collectionSelect).toBeDefined();
    expect(staffSelect).toBeDefined();
    expect(dateFromPick).toBeDefined();
    expect(dateToPick).toBeDefined();

    const cancelButton = getByText('CANCEL');
    const applyButton = getByText('APPLY');

    expect(cancelButton).toBeDefined();
    expect(applyButton).toBeDefined();
  });

  test('should update when label input change', () => {
    const { getByTestId } = renderWithAuth(<ConversationFilter />);

    const labelInput = getByTestId('labelInput');
    fireEvent.changeText(labelInput, 'John Doe');

    expect(labelInput.props.value).toBe('John Doe');
  });

  // test('should update state when multi-select options change', () => {
  //   const { getByLabelText } = renderWithAuth(<ConversationFilter />);

  //   // Update labels multi-select
  //   const labelsMultiSelect = getByLabelText('Includes Labels');
  //   fireEvent(labelsMultiSelect, 'selectOption', { id: '1', label: 'Age Group 11 to 14' });
  //   expect(labelsMultiSelect.props.selectedOptions).toEqual([
  //     { id: '1', label: 'Age Group 11 to 14' },
  //   ]);

  //   // Update collections multi-select
  //   const collectionsMultiSelect = getByLabelText('Includes Collections');
  //   fireEvent(collectionsMultiSelect, 'selectOption', { id: '2', label: 'Age Group 15 to 18' });
  //   expect(collectionsMultiSelect.props.selectedOptions).toEqual([
  //     { id: '2', label: 'Age Group 15 to 18' },
  //   ]);

  //   // Update staffs multi-select
  //   const staffsMultiSelect = getByLabelText('Includes Staffs');
  //   fireEvent(staffsMultiSelect, 'selectOption', { id: '3', label: 'Hindi' });
  //   expect(staffsMultiSelect.props.selectedOptions).toEqual([{ id: '3', label: 'Hindi' }]);
  // });

  test('calls the appropriate callbacks when buttons are pressed', () => {
    const navigationMock = { goBack: jest.fn() };
    const { getByText } = renderWithAuth(<ConversationFilter navigation={navigationMock} />);

    const cancelButton = getByText('CANCEL');
    const applyButton = getByText('APPLY');

    fireEvent.press(cancelButton);
    expect(navigationMock.goBack).toHaveBeenCalled();

    fireEvent.press(applyButton);
    expect(navigationMock.goBack).toHaveBeenCalled();
  });
});
