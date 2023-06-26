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
  GET_CONTACT_MESSAGES_MOCK,
  GET_CONTACT_STICKER_MESSAGE_MOCK,
  GET_CONTACT_TEXT_MESSAGE_MOCK,
  GET_CONTACT_VIDEO_MESSAGE_MOCK,
} from '../__mocks__/queries/contact';

const contactMock = {
  id: 1,
  name: 'John Doe',
  lastMessageAt: '2023-06-23T10:00:00.000Z',
};

describe('Chat screen', () => {
  test('renders chat header & input correctly', async () => {
    const { getByTestId, getByText } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_MESSAGES_MOCK
    );

    expect(getByTestId('backIcon')).toBeDefined();
    expect(getByTestId('userProfile')).toBeDefined();
    expect(getByText('John Doe')).toBeDefined();
    expect(getByTestId('menuIcon')).toBeDefined();

    expect(getByTestId('loadingIndicator')).toBeDefined();

    expect(getByTestId('upIcon')).toBeDefined();
    expect(getByTestId('emojiIcon')).toBeDefined();
    expect(getByTestId('chatInput')).toBeDefined();
    expect(getByTestId('paperClipIcon')).toBeDefined();
    expect(getByTestId('sendIcon')).toBeDefined();
  });

  test('renders test message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_TEXT_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const testMessage = await getByTestId('textMessage');
      expect(testMessage).toBeDefined();
    });
  });

  test('renders image message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_IMAGE_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const imageMessage = await getByTestId('imageMessage');
      expect(imageMessage).toBeDefined();
    });
  });

  test('renders video message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_VIDEO_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const videoMessage = await getByTestId('videoMessage');
      expect(videoMessage).toBeDefined();
    });
    // await waitFor(async () => {
    //   const videoThumbnail = await getByTestId('videoThumbnail');
    //   expect(videoThumbnail).toBeDefined();
    // });
  });

  test('renders audio message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_AUDIO_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const audioMessage = await getByTestId('audioMessage');
      expect(audioMessage).toBeDefined();
    });
  });

  test('renders document message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_DOCUMENT_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const documentMessage = await getByTestId('documentMessage');
      expect(documentMessage).toBeDefined();

      fireEvent.press(documentMessage);
      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://www.buildquickbots.com/whatsapp/media/sample/pdf/sample01.pdf'
      );
    });
  });

  test('renders sticker message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_STICKER_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const stickerMessage = await getByTestId('stickerMessage');
      expect(stickerMessage).toBeDefined();
    });
  });

  test('renders location message correctly', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_LOCATION_MESSAGE_MOCK
    );
    await waitFor(async () => {
      const locationMessage = await getByTestId('locationMessage');
      expect(locationMessage).toBeDefined();

      fireEvent.press(locationMessage);
      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://www.google.com/maps/search/?api=1&query=41.725556,-49.946944'
      );
    });
  });

  test('should open options tab when press up in chat input', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_MESSAGES_MOCK
    );

    const upIcon = getByTestId('upIcon');
    fireEvent.press(upIcon);

    await waitFor(async () => {
      const optionsTab = await getByTestId('optionsTab');
      expect(optionsTab).toBeDefined();
    });
  });

  test('should open emojis tab when press emoji in chat input', async () => {
    const { getByTestId } = customRender(
      <ChatScreen route={{ params: { contact: contactMock } }} />,
      GET_CONTACT_MESSAGES_MOCK
    );

    const emojiIcon = getByTestId('emojiIcon');
    fireEvent.press(emojiIcon);

    await waitFor(async () => {
      const emojisTab = await getByTestId('emojisTab');
      expect(emojisTab).toBeDefined();

      const keyboardIcon = await getByTestId('keyboardIcon');
      expect(keyboardIcon).toBeDefined();
    });
  });
});
