import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import SearchBar from '../components/ui/SearchBar';
import customRender from '../utils/jestRender';

describe('SearchBar', () => {
  const setSearchVariableMock = jest.fn();
  const onSearchMock = jest.fn();

  beforeEach(() => {
    setSearchVariableMock.mockClear();
    onSearchMock.mockClear();
  });

  test('should render Search Bar without menu', () => {
    const { getByTestId } = customRender(
      <SearchBar setSearchVariable={setSearchVariableMock} onSearch={onSearchMock} />
    );

    const searchIcon = getByTestId('searchIcon');
    const searchInput = getByTestId('searchInput');

    expect(searchIcon).toBeDefined();
    expect(searchInput).toBeDefined();
  });

  test('should render Search Bar with menu', () => {
    const { getByTestId } = customRender(
      <SearchBar
        setSearchVariable={setSearchVariableMock}
        onSearch={onSearchMock}
        showMenu={true}
      />
    );

    const searchIcon = getByTestId('searchIcon');
    const searchInput = getByTestId('searchInput');
    const filterIcon = getByTestId('filterIcon');
    const menuIcon = getByTestId('menuIcon');

    expect(searchIcon).toBeDefined();
    expect(searchInput).toBeDefined();
    expect(filterIcon).toBeDefined();
    expect(menuIcon).toBeDefined();
  });

  test('should changes the input value and call onSearch when search button is pressed  ', () => {
    const { getByTestId } = customRender(
      <SearchBar setSearchVariable={setSearchVariableMock} onSearch={onSearchMock} />
    );
    const searchIcon = getByTestId('searchIcon');
    const searchInput = getByTestId('searchInput');

    fireEvent.changeText(searchInput, 'test');
    fireEvent.press(searchIcon);
    expect(onSearchMock).toHaveBeenCalled();
  });

  it('should show menu component when showMenu is true', async () => {
    const { getByTestId } = customRender(
      <SearchBar
        setSearchVariable={setSearchVariableMock}
        onSearch={onSearchMock}
        showMenu={true}
      />
    );
    await waitFor(() => {
      fireEvent.press(getByTestId('menuIcon'));
    });
    const menu = screen.queryByTestId('menuCard');
    expect(menu).toBeTruthy();
  });
});
