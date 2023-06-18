import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ContactProfile from '../screens/ContactProfile/ContactProfile';
import MoreInfoScreen from '../screens/ContactProfile/MoreInfoScreen';
import { GET_CONTACT_HISTORY } from '../graphql/queries/ContactHistory';
import { MockedProvider } from '@apollo/client/testing';
import ContactHistoryScreen from '../screens/ContactProfile/ContactHistoryScreen';
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      dispatch: mockDispatch,
    }),
  };
});

describe('Contact Proifile', () => {
  //   const mocks = [
  //     {
  //       request: {
  //         query: GET_CONTACT_HISTORY,
  //         variables: {
  //           filter: { contactId: undefined },
  //           opts: { limit: 10, offset: 0, order: 'DESC' },
  //         },
  //       },
  //       response: {
  //         data: {
  //                 contactHistory: [
  //                     {
  //                         id: '19',
  //                         eventLabel: 'Test',
  //                         eventDateTime: '12/12/12',
  //                     },
  //                 ],

  //         },
  //       },
  //     },
  //   ];
  const contact = {
    params: {
      contact: {
        name: 'helloworld',
      },
    },
  };
  test('Contact prrofile screen', async () => {
    render(<ContactProfile route={contact} navigation={mockNavigate} />);
    expect(screen.getByTestId('mainContainer')).toBeTruthy();
    expect(screen.findAllByText('helloworld')).toBeTruthy();
  });

  test('moreInfoScreen render', () => {
    render(<MoreInfoScreen />);
    expect(screen.getByTestId('mainContainer')).toBeTruthy();
  });

  //   test('contact history screen', async () => {
  //     render(
  //       <MockedProvider mocks={mocks} addTypename={false}>
  //         <ContactHistoryScreen route={contact} navigtion={mockNavigate} />
  //       </MockedProvider>
  //     );
  //     expect(await screen.getByTestId('backButton')).toBeTruthy();
  //   });
});
