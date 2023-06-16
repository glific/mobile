import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Notifications from '../screens/Notifications';
import renderWithAuth from '../utils/authProvider';

// describe('Notifications Screen', () => {
//   test('renders the Notifications screen', () => {
//     const { getAllByText } = renderWithAuth(<Notifications />);
//     const notificationText = getAllByText('Glific stimulator four');
//     expect(notificationText).toHaveLength(5);
//   });
// });

describe('Notifications', () => {
  const navigationMock = { setOptions: jest.fn() };

  test('renders the notification list with the correct number of items', () => {
    const { getAllByTestId } = renderWithAuth(<Notifications navigation={navigationMock} />);
    const notificationItems = getAllByTestId('notificationItem');
    expect(notificationItems.length).toBe(5);
  });

  test('changes the active tab and updates the notification array when a tab is pressed', () => {
    const { getByText, getAllByTestId } = renderWithAuth(
      <Notifications navigation={navigationMock} />
    );

    const allTab = getByText('All');
    const criticalTab = getByText('Critical');
    const warningTab = getByText('Warning');
    const infoTab = getByText('Info');

    // Click the "Critical" tab
    fireEvent.press(criticalTab);
    const notificationItemsCritical = getAllByTestId('notificationItem');
    expect(notificationItemsCritical.length).toBe(1);
    expect(notificationItemsCritical[0]).toEqual('Critical');

    // Click the "Warning" tab
    fireEvent.press(warningTab);
    const notificationItemsWarning = getAllByTestId('notificationItem');
    expect(notificationItemsWarning.length).toBe(2);
    expect(notificationItemsWarning[0]).toEqual('Warning');
    expect(notificationItemsWarning[1]).toEqual('Warning');

    // Click the "Info" tab
    fireEvent.press(infoTab);
    const notificationItemsInfo = getAllByTestId('notificationItem');
    expect(notificationItemsInfo.length).toBe(2);
    expect(notificationItemsInfo[0]).toEqual('Info');
    expect(notificationItemsInfo[1]).toEqual('Info');

    // Click the "All" tab
    fireEvent.press(allTab);
    const notificationItemsAll = getAllByTestId('notificationItem');
    expect(notificationItemsAll.length).toBe(5);
  });

  test('updates the search value when the search input changes', () => {
    const { getByTestId } = renderWithAuth(<Notifications navigation={navigationMock} />);

    const searchInput = getByTestId('searchInput');

    fireEvent.changeText(searchInput, 'search query');
    expect(searchInput.props.value).toBe('search query');

    fireEvent.changeText(searchInput, 'new search');
    expect(searchInput.props.value).toBe('new search');
  });

  test('calls the handleSearch function when the search input changes', () => {
    const handleSearchMock = jest.fn();
    const { getByTestId } = renderWithAuth(<Notifications navigation={navigationMock} />);

    const searchInput = getByTestId('searchInput');
    fireEvent.changeText(searchInput, 'search query');

    expect(handleSearchMock).not.toHaveBeenCalled();
    renderWithAuth(<Notifications navigation={navigationMock} handleSearch={handleSearchMock} />);

    fireEvent.changeText(searchInput, 'new search');
    expect(handleSearchMock).toHaveBeenCalledWith('new search');
  });
});
