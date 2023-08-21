import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import ContactProfile from '../screens/ContactProfile';
import { CONTACT_INFO_MOCK } from '../__mocks__/queries/contact';

const contactMock = {
  id: '12',
  name: 'John Doe',
  lastMessageAt: '2023-06-15',
};

const navigationMock = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('ContactProfile', () => {
  test('renders the contact profile with correct information', async () => {
    const { getByTestId, getByText } = customRender(
      <ContactProfile navigation={navigationMock} route={{ params: { contact: contactMock } }} />,
      CONTACT_INFO_MOCK
    );
    await waitFor(() => {
      expect(getByTestId('backIcon')).toBeDefined();
      expect(getByTestId('sessionTimer')).toBeDefined();
      expect(getByTestId('userProfile')).toBeDefined();
    });
    const userName = getByTestId('userName');
    await waitFor(() => {
      expect(userName.props.children).toBe(contactMock.name);

      expect(getByTestId('Phone')).toBeDefined();
      expect(getByTestId('Assigned to')).toBeDefined();
      expect(getByTestId('Language')).toBeDefined();
      expect(getByTestId('Status')).toBeDefined();
      expect(getByTestId('Collections')).toBeDefined();

      expect(getByText('View Info')).toBeDefined();
      expect(getByText('Contact History')).toBeDefined();
    });
  });

  test('calls the navigation.goBack() function when the back button is pressed', async () => {
    const { getByTestId } = customRender(
      <ContactProfile navigation={navigationMock} route={{ params: { contact: contactMock } }} />,
      CONTACT_INFO_MOCK
    );

    fireEvent.press(getByTestId('backIcon'));
    await waitFor(() => {
      expect(navigationMock.goBack).toHaveBeenCalled();
    });
  });

  test('navigate to view info page', async () => {
    const { getByText } = customRender(
      <ContactProfile navigation={navigationMock} route={{ params: { contact: contactMock } }} />,
      CONTACT_INFO_MOCK
    );
    await waitFor(async () => {
      fireEvent.press(getByText('View Info'));
      expect(navigationMock.navigate).toHaveBeenCalledWith('ContactInformation', {
        fields: { Name: 'John', Age: '15 to 18' },
      });
    });
  });

  test('navigate to contact history page', async () => {
    const { getByText } = customRender(
      <ContactProfile navigation={navigationMock} route={{ params: { contact: contactMock } }} />,
      CONTACT_INFO_MOCK
    );

    await waitFor(async () => {
      fireEvent.press(getByText('Contact History'));
      expect(navigationMock.navigate).toHaveBeenCalledWith('ContactHistory', {
        id: '12',
      });
    });
  });
});
