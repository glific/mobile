import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import ContactProfile from '../screens/ContactProfile';
import renderWithAuth from '../utils/authProvider';

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
    const backButton = getByTestId('backButton');
    const viewMoreButton = getByText('View More');

    expect(userProfile).toBeDefined();
    expect(userName.props.children).toBe(contact.name);
    expect(backButton).toBeDefined();
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

  test('toggles the "isMore" state when the view more button is pressed', () => {
    const { getByText } = renderWithAuth(<ContactProfile route={{ params: { contact } }} />);

    const viewMoreButton = getByText('View More');

    fireEvent.press(viewMoreButton);
    expect(viewMoreButton.props.children[0]).toBe('View Less');

    fireEvent.press(viewMoreButton);
    expect(viewMoreButton.props.children[0]).toBe('View More');
  });
});
