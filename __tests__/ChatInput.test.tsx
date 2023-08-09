import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';
import axios from 'axios';
import ChatInput from '../components/messages/ChatInput';
import {
  GET_INTERACTIVE_MESSAGES_MOCK,
  GET_TEMPLATES_MOCK,
  completionMock,
  fieldsMock,
} from '../__mocks__/queries/templates';
import {
  SEND_COLLECTION_INTERACTIVE_MESSAGE_MOCK,
  SEND_CONTACT_TEMPLATE_MESSAGE_MOCK,
} from '../__mocks__/mutations/chats';

jest.mock('axios');

describe('chat input', () => {
  test('should open keyboard on clicking keyboard icon', async () => {
    const { getByTestId } = customRender(<ChatInput conversationType={'contact'} id={1} />);

    const emojiIcon = getByTestId('emojiIcon');
    expect(emojiIcon).toBeDefined();
    fireEvent.press(emojiIcon);

    await waitFor(() => {
      const keyboardIcon = getByTestId('keyboardIcon');
      expect(keyboardIcon).toBeDefined();
      fireEvent.press(keyboardIcon);
    });
  });

  test('should open speed send bottom sheet', async () => {
    const { getByTestId, getByText } = customRender(
      <ChatInput conversationType={'contact'} id={1} />,
      [GET_TEMPLATES_MOCK, GET_INTERACTIVE_MESSAGES_MOCK]
    );

    fireEvent.press(getByTestId('upIcon'));

    await waitFor(async () => {
      const speedSend = getByTestId('speedSend');
      expect(speedSend).toBeDefined();

      fireEvent.press(speedSend);
    });

    await waitFor(async () => {
      const bsBack = await getByTestId('bsBackIcon');
      const bsSearch = await getByTestId('bsSearch');
      const template = await getByTestId('template_2');

      expect(bsBack).toBeDefined();
      expect(bsSearch).toBeDefined();
      expect(template).toBeDefined();
      expect(await getByText('test speed send body')).toBeDefined();

      fireEvent.changeText(bsSearch, 'Test');
      expect(bsSearch.props.value).toEqual('Test');
      expect(await getByText('Test Speed send')).toBeDefined();

      fireEvent.press(template);
    });

    const clearIcon = getByTestId('clearIcon');
    expect(clearIcon).toBeDefined();
    fireEvent.press(clearIcon);
  });

  test('should open templates bottom sheet and cancel the template after selecting', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(fieldsMock));
    axios.get.mockImplementationOnce(() => Promise.resolve(completionMock));
    const { getByTestId, getByText } = customRender(
      <ChatInput conversationType={'contact'} id={1} />,
      [GET_TEMPLATES_MOCK, GET_INTERACTIVE_MESSAGES_MOCK]
    );

    const moreOption = getByTestId('upIcon');
    fireEvent.press(moreOption);

    await waitFor(() => {
      const templates = getByTestId('templates');
      expect(templates).toBeDefined();

      fireEvent.press(templates);
    });

    await waitFor(async () => {
      const bsBack = await getByTestId('bsBackIcon');
      const bsSearch = await getByTestId('bsSearch');
      const template = await getByTestId('template_1');

      expect(bsBack).toBeDefined();
      expect(bsSearch).toBeDefined();
      expect(template).toBeDefined();
      expect(await getByText('test {{1}} body')).toBeDefined();

      fireEvent.changeText(bsSearch, 'Test');
      expect(bsSearch.props.value).toEqual('Test');
      expect(await getByText('Test Template')).toBeDefined();

      fireEvent.press(template);
    });

    const cancelButton = getByText('CANCEL');
    const doneButton = getByText('DONE');
    const variable1 = getByTestId('variableInput_1');

    expect(cancelButton).toBeDefined();
    expect(doneButton).toBeDefined();
    expect(variable1).toBeDefined();

    fireEvent.press(cancelButton);
  });

  test('should open templates bottom sheet and send the template after selecting', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(fieldsMock));
    axios.get.mockImplementationOnce(() => Promise.resolve(completionMock));

    const { getByTestId, getByText } = customRender(
      <ChatInput conversationType={'contact'} id={1} />,
      [GET_TEMPLATES_MOCK, SEND_CONTACT_TEMPLATE_MESSAGE_MOCK, GET_INTERACTIVE_MESSAGES_MOCK]
    );

    await waitFor(() => {
      expect(getByTestId('chatInput')).toBeDefined();
    });
    const chatInput = getByTestId('chatInput');
    const moreOption = getByTestId('upIcon');
    const sendButton = getByTestId('sendIcon');
    fireEvent.press(moreOption);

    await waitFor(() => {
      expect(getByTestId('templates')).toBeDefined();
    });
    const templates = getByTestId('templates');
    fireEvent.press(templates);

    await waitFor(() => {
      expect(getByTestId('bsBackIcon')).toBeDefined();
    });
    const bsBack = getByTestId('bsBackIcon');
    const bsSearch = getByTestId('bsSearch');
    const template = getByTestId('template_1');

    await waitFor(() => {
      expect(bsBack).toBeDefined();
      expect(bsSearch).toBeDefined();
      expect(template).toBeDefined();
      expect(getByText('test {{1}} body')).toBeDefined();
    });
    fireEvent.changeText(bsSearch, 'Test');

    await waitFor(() => {
      expect(bsSearch.props.value).toEqual('Test');
      expect(getByText('Test Template')).toBeDefined();
    });

    fireEvent.press(template);

    await waitFor(() => {
      expect(getByText('CANCEL')).toBeDefined();
    });

    const cancelButton = getByText('CANCEL');
    const doneButton = getByText('DONE');
    const variable1 = getByTestId('variableInput_1');

    expect(cancelButton).toBeDefined();
    expect(doneButton).toBeDefined();
    expect(variable1).toBeDefined();

    fireEvent.press(doneButton);

    await waitFor(() => {
      expect(getByText('Please fill all the variables.')).toBeTruthy();
    });

    fireEvent.changeText(variable1, 'template');
    fireEvent.press(doneButton);

    await waitFor(() => {
      expect(chatInput.props.value).toEqual('test template body');
    });

    fireEvent.press(sendButton);
    // need to check something after send button is clicked
    await waitFor(() => {});
  });

  test('should open interactive message bottom sheet', async () => {
    const { getByTestId, getByText } = customRender(
      <ChatInput conversationType={'collection'} id={1} />,
      [GET_TEMPLATES_MOCK, GET_INTERACTIVE_MESSAGES_MOCK, SEND_COLLECTION_INTERACTIVE_MESSAGE_MOCK]
    );

    await waitFor(() => {
      expect(getByTestId('chatInput')).toBeDefined();
    });

    const chatInput = getByTestId('chatInput');
    const moreOption = getByTestId('upIcon');
    const sendButton = getByTestId('sendIcon');
    fireEvent.press(moreOption);

    await waitFor(() => {
      expect(getByTestId('interactive')).toBeDefined();
    });

    const interactive = getByTestId('interactive');
    fireEvent.press(interactive);
    await waitFor(() => {
      expect(getByTestId('bsBackIcon')).toBeDefined();
    });

    const bsBack = getByTestId('bsBackIcon');
    const bsSearch = getByTestId('bsSearch');
    const template = getByTestId('template_1');

    await waitFor(() => {
      expect(bsBack).toBeDefined();
      expect(bsSearch).toBeDefined();
      expect(template).toBeDefined();
      expect(getByText('test interactive message body')).toBeDefined();
    });

    fireEvent.changeText(bsSearch, 'Test');

    await waitFor(() => {
      expect(bsSearch.props.value).toEqual('Test');
      expect(getByText('Test interactive message')).toBeDefined();
    });

    fireEvent.press(template);

    await waitFor(() => {
      expect(chatInput.props.value).toEqual('test interactive message body');
    });

    fireEvent.press(sendButton);
    // need to check something after send button is clicked
    await waitFor(() => {});
  });
});
