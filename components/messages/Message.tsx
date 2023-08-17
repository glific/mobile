import React from 'react';

import TextMessage from './MessageTypes/TextMessage';
import ListMessage from './MessageTypes/ListMessage';
import ImageMessage from './MessageTypes/ImageMessage';
import VideoMessage from './MessageTypes/VideoMessage';
import AudioMessage from './MessageTypes/AudioMessage';
import StickerMessage from './MessageTypes/StickerMessage';
import DocumentMessage from './MessageTypes/DocumentMessage';
import LocationMessage from './MessageTypes/LocationMessage';
import QuickReplyMessage from './MessageTypes/QuickReplyMessage';

export type MessageType = {
  id: number;
  type: string;
  body: string;
  contextMessage: unknown;
  media: {
    id: number;
    url: string;
    caption: string;
  };
  insertedAt: string;
  flowLabel: string | null;
  interactiveContent: object;
  location: {
    latitude: number;
    longitude: number;
  };
  messageNumber?: number;
  receiver: {
    id: number;
  };
  sender: {
    id: number;
  };
  errors: unknown;
  sendBy: string;
};

interface Props {
  isLeft: boolean;
  handleImage: () => void;
  handleVideo: () => void;
  openImage: boolean;
  openVideo: boolean;
  message: MessageType;
}

const Message = ({ isLeft, message, handleImage, handleVideo, openImage, openVideo }: Props) => {
  const dateObj = new Date(message.insertedAt);
  const formattedTime = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  let messageBody;
  switch (message.type) {
    case 'IMAGE':
      messageBody = (
        <ImageMessage
          message={message}
          openImage={openImage}
          handleImage={handleImage}
          time={formattedTime}
          isLeft={isLeft}
        />
      );
      break;
    case 'VIDEO':
      messageBody = (
        <VideoMessage
          message={message}
          openVideo={openVideo}
          handleVideo={handleVideo}
          time={formattedTime}
          isLeft={isLeft}
        />
      );
      break;
    case 'AUDIO':
      messageBody = <AudioMessage uri={message.media.url} time={formattedTime} isLeft={isLeft} />;
      break;
    case 'DOCUMENT':
      messageBody = <DocumentMessage message={message} time={formattedTime} isLeft={isLeft} />;
      break;
    case 'STICKER':
      messageBody = <StickerMessage uri={message.media.url} time={formattedTime} isLeft={isLeft} />;
      break;
    case 'LOCATION':
      messageBody = (
        <LocationMessage location={message.location} time={formattedTime} isLeft={isLeft} />
      );
      break;
    case 'QUICK_REPLY':
      messageBody = <QuickReplyMessage message={message} time={formattedTime} isLeft={isLeft} />;
      break;
    case 'LIST':
      messageBody = <ListMessage message={message} time={formattedTime} isLeft={isLeft} />;
      break;
    default:
      messageBody = <TextMessage body={message.body} time={formattedTime} isLeft={isLeft} />;
      break;
  }

  return messageBody;
};

export default Message;
