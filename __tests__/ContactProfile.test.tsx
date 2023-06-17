import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import ContactProfile from '../screens/ContactProfile';
import renderWithAuth from '../utils/authProvider';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    AntDesign: View,
  };
});

describe('ContactProfile', () => {
  const contact = {
    name: 'John Doe',
    lastMessageAt: '2023-06-15',
  };

  test('renders the contact profile with correct information', () => {
    const { getByTestId, getByText } = renderWithAuth(
      <ContactProfile route={{ params: { contact } }} />
    );

    const userProfile = getByTestId('userProfile');
    const userName = getByTestId('userName');
    const viewMoreButton = getByText('View More');

    expect(userProfile).toBeDefined();
    expect(userName.props.children).toBe(contact.name);
    expect(viewMoreButton).toBeDefined();

    // Additional assertions for other contact details
    const statusText = getByText('Valid contact');
    const languageText = getByText('English');
    const phoneText = getByText('+919876543210');
    const collectionsText = getByText('Optin contact');
    const assignedToText = getByText('None');
    const statusMessageText = getByText(`Optin via WA on ${contact.lastMessageAt}`);

    expect(statusText).toBeDefined();
    expect(languageText).toBeDefined();
    expect(phoneText).toBeDefined();
    expect(collectionsText).toBeDefined();
    expect(assignedToText).toBeDefined();
    expect(statusMessageText).toBeDefined();
  });

  test('calls the navigation.goBack() function when the back button is pressed', () => {
    const navigationMock = { goBack: jest.fn() };
    const { getByTestId } = renderWithAuth(
      <ContactProfile navigation={navigationMock} route={{ params: { contact } }} />
    );

    const backButton = getByTestId('backButton');
    fireEvent.press(backButton);
    expect(navigationMock.goBack).toHaveBeenCalled();
  });
});
