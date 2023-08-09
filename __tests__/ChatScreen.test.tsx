import React from 'react';
import { Linking } from 'react-native';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import ChatScreen from '../screens/ChatScreen';
import {
  GET_CONTACT_AUDIO_MESSAGE_MOCK,
  GET_CONTACT_DOCUMENT_MESSAGE_MOCK,
  GET_CONTACT_IMAGE_MESSAGE_MOCK,
  GET_CONTACT_LOCATION_MESSAGE_MOCK,
  GET_CONTACT_MESSAGES_FLOW_MOCK,
  GET_CONTACT_MESSAGES_MOCK,
  GET_CONTACT_MESSAGES_POPUPS_MOCK,
  GET_CONTACT_NO_MESSAGE_MOCK,
  GET_CONTACT_QUCIK_REPLY_MESSAGE_MOCK,
  GET_CONTACT_STICKER_MESSAGE_MOCK,
  GET_CONTACT_TEXT_MESSAGE_MOCK,
  GET_CONTACT_VIDEO_MESSAGE_MOCK,
} from '../__mocks__/queries/contact';
import {
  GET_COLLECTION_NO_MESSAGE_MOCK,
  GET_COLLECTION_TEXT_MESSAGE_MOCK,
} from '../__mocks__/queries/collection';
import { subscriptionMocks } from '../__mocks__/subscriptions/message';
import { GET_INTERACTIVE_MESSAGES_MOCK, GET_TEMPLATES_MOCK } from '../__mocks__/queries/templates';

const contactMock = {
  id: 1,
  displayName: 'test contact name',
  conversationType: 'contact',
  lastMessageAt: '2023-06-23T10:00:00.000Z',
};

const collectionMock = {
  id: 1,
  displayName: 'test collection name',
  conversationType: 'collection',
};

describe('Chat screen', () => {
  test('renders chat header & input correctly', async () => {
    const { getByTestId, getByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      [...GET_CONTACT_NO_MESSAGE_MOCK, ...subscriptionMocks]
    );

    await waitFor(() => {
      expect(getByTestId('backIcon')).toBeDefined();
      expect(getByTestId('userProfile')).toBeDefined();
      expect(getByText('test contact name')).toBeDefined();
      expect(getByTestId('menuIcon')).toBeDefined();
    });

    await waitFor(() => {
      expect(getByTestId('upIcon')).toBeDefined();
      expect(getByTestId('emojiIcon')).toBeDefined();
      expect(getByTestId('chatInput')).toBeDefined();
      expect(getByTestId('clipIcon')).toBeDefined();
      expect(getByTestId('sendIcon')).toBeDefined();
    });
  });

  test('should open contact chat screen menu', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_NO_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    fireEvent.press(getByTestId('menuIcon'));
    await waitFor(() => {
      const contactMenu = getByTestId('contactChatMenu');
      expect(contactMenu).toBeDefined();
    });
  });

  test('should open Collection chat screen menu', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...collectionMock } }} />, [
      ...GET_COLLECTION_NO_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    fireEvent.press(getByTestId('menuIcon'));
    await waitFor(() => {
      const collectionMenu = getByTestId('collectionChatMenu');
      expect(collectionMenu).toBeDefined();
    });
  });

  test('renders no message correctly', async () => {
    const { getByText } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_NO_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const testMessage = getByText('No messages');
      expect(testMessage).toBeDefined();
    });
  });

  test('renders colllection no message correctly', async () => {
    const { getByText } = customRender(<ChatScreen route={{ params: { ...collectionMock } }} />, [
      ...GET_COLLECTION_NO_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const testMessage = getByText('No messages');
      expect(testMessage).toBeDefined();
    });
  });

  test('renders test message correctly', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_TEXT_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const testMessage = getByTestId('textMessage');
      expect(testMessage).toBeDefined();
    });
  });

  test('renders collection test message correctly', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...collectionMock } }} />, [
      ...GET_COLLECTION_TEXT_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const testMessage = getByTestId('textMessage');
      expect(testMessage).toBeDefined();
    });
  });

  test('renders image message correctly', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_IMAGE_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const imageMessage = getByTestId('imageMessage');
      expect(imageMessage).toBeDefined();
    });
  });

  test('renders video message correctly', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_VIDEO_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const videoMessage = getByTestId('videoMessage');
      expect(videoMessage).toBeDefined();
    });
  });

  test('renders audio message correctly', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_AUDIO_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const audioMessage = getByTestId('audioMessage');
      expect(audioMessage).toBeDefined();
    });
  });

  test('renders document message correctly', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_DOCUMENT_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const documentMessage = getByTestId('documentMessage');
      expect(documentMessage).toBeDefined();

      fireEvent.press(documentMessage);
      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://www.buildquickbots.com/whatsapp/media/sample/pdf/sample01.pdf'
      );
    });
  });

  test('renders sticker message correctly', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_STICKER_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const stickerMessage = getByTestId('stickerMessage');
      expect(stickerMessage).toBeDefined();
    });
  });

  test('renders location message correctly', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_LOCATION_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const locationMessage = getByTestId('locationMessage');
      expect(locationMessage).toBeDefined();

      fireEvent.press(locationMessage);
      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://www.google.com/maps/search/?api=1&query=41.725556,-49.946944'
      );
    });
  });

  test('renders quick reply message correctly', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_QUCIK_REPLY_MESSAGE_MOCK,
      ...subscriptionMocks,
    ]);
    await waitFor(() => {
      const quickReplyMessage = getByTestId('quickReplyMessage');
      const quickOption0 = getByTestId('quickOption0');
      const quickOption1 = getByTestId('quickOption1');

      expect(quickReplyMessage).toBeDefined();
      expect(quickOption0).toBeDefined();
      expect(quickOption1).toBeDefined();
    });
  });

  test('should open options tab when press up in chat input', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_MESSAGES_MOCK,
      ...subscriptionMocks,
      GET_TEMPLATES_MOCK,
      GET_INTERACTIVE_MESSAGES_MOCK,
    ]);

    const upIcon = getByTestId('upIcon');
    fireEvent.press(upIcon);

    await waitFor(async () => {
      const optionsTab = await getByTestId('optionsTab');
      expect(optionsTab).toBeDefined();
    });
  });

  test('should open emojis tab when press emoji in chat input', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_MESSAGES_MOCK,
      ...subscriptionMocks,
    ]);

    fireEvent.press(getByTestId('emojiIcon'));

    await waitFor(() => {
      const emojisTab = getByTestId('emojisTab');
      expect(emojisTab).toBeDefined();

      const keyboardIcon = getByTestId('keyboardIcon');
      expect(keyboardIcon).toBeDefined();
    });
  });

  test('should open attachments tab when press clip in chat input', async () => {
    const { getByTestId } = customRender(<ChatScreen route={{ params: { ...contactMock } }} />, [
      ...GET_CONTACT_MESSAGES_MOCK,
      ...subscriptionMocks,
    ]);

    fireEvent.press(getByTestId('clipIcon'));

    await waitFor(async () => {
      const emojisTab = await getByTestId('attachmentsTab');
      expect(emojisTab).toBeDefined();
    });
  });

  test('should start a flow', async () => {
    const { getByTestId, queryByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      [...GET_CONTACT_MESSAGES_FLOW_MOCK, ...subscriptionMocks]
    );

    fireEvent.press(getByTestId('menuIcon'));

    await waitFor(() => {
      const startFlowButton = queryByText('Start a flow');
      fireEvent.press(startFlowButton);
    });

    await waitFor(() => {
      const popupMenu = getByTestId('startFlowPopup');
      const flowPicker = getByTestId('flow-picker');

      expect(popupMenu).toBeDefined();
      expect(flowPicker).toBeDefined();

      expect(flowPicker.props.selectedIndex).toStrictEqual(0);

      const startButton = queryByText('START');
      expect(startButton).toBeDefined();
      // Todo: flow is not selected using the above method.
      // fireEvent.press(startButton);
    });
  });

  test('should terminate a flow', async () => {
    const { getByTestId, queryByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      [...GET_CONTACT_MESSAGES_POPUPS_MOCK, ...subscriptionMocks]
    );

    fireEvent.press(getByTestId('menuIcon'));

    await waitFor(() => {
      const terminateFlowButton = queryByText('Terminate Flows');
      fireEvent.press(terminateFlowButton);
    });

    await waitFor(() => {
      expect(getByTestId('chatPopup')).toBeDefined();
      expect(getByTestId('cancelButton')).toBeDefined();

      const yesButton = queryByText('YES');
      expect(yesButton).toBeDefined();
      fireEvent.press(yesButton);
    });
  });

  test('should clear conversation', async () => {
    const { getByTestId, queryByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      [...GET_CONTACT_MESSAGES_POPUPS_MOCK, ...subscriptionMocks]
    );

    fireEvent.press(getByTestId('menuIcon'));

    await waitFor(() => {
      const clearConversationButton = queryByText('Clear Conversation');
      fireEvent.press(clearConversationButton);
    });

    await waitFor(() => {
      expect(getByTestId('chatPopup')).toBeDefined();
      expect(getByTestId('cancelButton')).toBeDefined();

      const yesButton = queryByText('YES');
      expect(yesButton).toBeDefined();
      fireEvent.press(yesButton);
    });
  });

  test('should block contact', async () => {
    const { getByTestId, queryByText } = customRender(
      <ChatScreen route={{ params: { ...contactMock } }} />,
      [...GET_CONTACT_MESSAGES_POPUPS_MOCK, ...subscriptionMocks]
    );

    fireEvent.press(getByTestId('menuIcon'));

    await waitFor(() => {
      const blockContactButton = queryByText('Block Contact');
      fireEvent.press(blockContactButton);
    });

    await waitFor(() => {
      expect(getByTestId('chatPopup')).toBeDefined();
      expect(getByTestId('cancelButton')).toBeDefined();

      const yesButton = queryByText('YES');
      expect(yesButton).toBeDefined();
      fireEvent.press(yesButton);
    });
  });
});
