import React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import ContactProfile from '../screens/ContactProfile';

describe('ContactProfile', () => {
  const contact = {
    name: 'John Doe',
    lastMessageAt: '2023-05-30',
  };

  it('should render the contact profile correctly', () => {
    const { queryByTestId, queryAllByText } = render(
      <ContactProfile route={{ params: { contact } }} />
    );

    // Check if the user profile image is rendered
    expect(queryByTestId('userProfile')).toBeTruthy();

    // Check if the contact name is rendered
    expect(queryByTestId('userName')).toBeTruthy();
    expect(queryAllByText('John Doe')).toBeTruthy();

    // Check if the back button is rendered
    expect(queryByTestId('backButton')).toBeTruthy();

    // Check if the profile details are rendered
    expect(queryAllByText('Name')).toBeTruthy();
    expect(queryAllByText('Status')).toBeTruthy();
    expect(queryAllByText('Provider status')).toBeTruthy();
    expect(queryAllByText('Language')).toBeTruthy();

    // Check if the contact history section is rendered
    expect(queryAllByText('Contact history')).toBeTruthy();
  });

  it('should toggle "isMore" state when the view button is pressed', () => {
    const { getByText } = render(<ContactProfile route={{ params: { contact } }} />);

    const viewButton = getByText('View More');

    fireEvent.press(viewButton);

    // Check if the "isMore" state is toggled
    expect(getByText('View Less')).toBeTruthy();

    fireEvent.press(viewButton);

    // Check if the "isMore" state is toggled again
    expect(getByText('View More')).toBeTruthy();
  });
});
