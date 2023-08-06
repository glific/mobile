import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import ChatInput from '../components/messages/ChatInput';
import { GET_INTERACTIVE_MESSAGES_MOCK, GET_TEMPLATES_MOCK } from '../__mocks__/queries/templates';
import {
  SEND_COLLECTION_INTERACTIVE_MESSAGE_MOCK,
  SEND_CONTACT_TEMPLATE_MESSAGE_MOCK,
} from '../__mocks__/mutations/chats';

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
      [GET_TEMPLATES_MOCK]
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
    const { getByTestId, getByText } = customRender(
      <ChatInput conversationType={'contact'} id={1} />,
      [GET_TEMPLATES_MOCK]
    );

    const moreOption = getByTestId('upIcon');
    fireEvent.press(moreOption);

    await waitFor(async () => {
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
    const { getByTestId, getByText } = customRender(
      <ChatInput conversationType={'contact'} id={1} />,
      [GET_TEMPLATES_MOCK, SEND_CONTACT_TEMPLATE_MESSAGE_MOCK]
    );

    const chatInput = getByTestId('chatInput');
    const moreOption = getByTestId('upIcon');
    const sendButton = getByTestId('sendIcon');
    fireEvent.press(moreOption);

    await waitFor(async () => {
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

    fireEvent.press(doneButton);
    expect(getByText('Please fill all the variables.')).toBeTruthy();

    fireEvent.changeText(variable1, 'template');
    fireEvent.press(doneButton);
    expect(chatInput.props.value).toEqual('test template body');

    fireEvent.press(sendButton);
  });

  test('should open interactive message bottom sheet', async () => {
    const { getByTestId, getByText } = customRender(
      <ChatInput conversationType={'collection'} id={1} />,
      [GET_INTERACTIVE_MESSAGES_MOCK, SEND_COLLECTION_INTERACTIVE_MESSAGE_MOCK]
    );

    const chatInput = getByTestId('chatInput');
    const moreOption = getByTestId('upIcon');
    const sendButton = getByTestId('sendIcon');
    fireEvent.press(moreOption);

    await waitFor(async () => {
      const interactive = getByTestId('interactive');
      expect(interactive).toBeDefined();

      fireEvent.press(interactive);
    });

    await waitFor(async () => {
      const bsBack = await getByTestId('bsBackIcon');
      const bsSearch = await getByTestId('bsSearch');
      const template = await getByTestId('template_1');

      expect(bsBack).toBeDefined();
      expect(bsSearch).toBeDefined();
      expect(template).toBeDefined();
      expect(await getByText('test interactive message body')).toBeDefined();

      fireEvent.changeText(bsSearch, 'Test');
      expect(bsSearch.props.value).toEqual('Test');
      expect(await getByText('Test interactive message')).toBeDefined();

      fireEvent.press(template);
    });

    expect(chatInput.props.value).toEqual('test interactive message body');
    fireEvent.press(sendButton);
  });
});
