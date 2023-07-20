import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import ContactProfile from '../screens/ContactProfile';

const contactMock = {
  id: '12',
  name: 'John Doe',
  lastMessageAt: '2023-06-15',
};

describe('ContactProfile', () => {
  test('renders the contact profile with correct information', () => {
    const { getByTestId, getByText } = customRender(
      <ContactProfile route={{ params: { contact: contactMock } }} />
    );

    expect(getByTestId('backIcon')).toBeDefined();
    expect(getByTestId('sessionTimer')).toBeDefined();
    expect(getByTestId('userProfile')).toBeDefined();
    const userName = getByTestId('userName');
    expect(userName.props.children).toBe(contactMock.name);

    expect(getByTestId('Phone')).toBeDefined();
    expect(getByTestId('Assigned to')).toBeDefined();
    expect(getByTestId('Language')).toBeDefined();
    expect(getByTestId('Status')).toBeDefined();
    expect(getByTestId('Collections')).toBeDefined();

    expect(getByText('View Info')).toBeDefined();
    expect(getByText('Contact History')).toBeDefined();
  });

  test('calls the navigation.goBack() function when the back button is pressed', () => {
    const navigationMock = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const { getByTestId, getByText } = customRender(
      <ContactProfile navigation={navigationMock} route={{ params: { contact: contactMock } }} />
    );

    fireEvent.press(getByTestId('backIcon'));
    expect(navigationMock.goBack).toHaveBeenCalled();

    fireEvent.press(getByText('View Info'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('ContactInformation');

    fireEvent.press(getByText('Contact History'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('ContactHistory');
  });
});
