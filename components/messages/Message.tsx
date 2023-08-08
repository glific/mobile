import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Linking, Pressable, ImageBackground } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as VideoThumbnails from 'expo-video-thumbnails';

import { COLORS, SCALE, SIZES } from '../../constants';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import ImageViewer from './ImageViewer';

type MessageProps = {
  isLeft: boolean;
  handleImage: () => void;
  handleVideo: () => void;
  openImage: boolean;
  openVideo: boolean;
  message: {
    id: number;
    type: string;
    body: string;
    contextMessage: unknown;
    media: object | null;
    insertedAt: string;
    flowLabel: string | null;
    interactiveContent: object;
    location: object | null;
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
};

const VideoThumbnail = ({ videoUri }: { videoUri: string }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    generateThumbnail(videoUri);
  }, [videoUri]);

  const generateThumbnail = async (url: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
        time: 4000,
      });
      setThumbnailUrl(uri);
    } catch (error) {
      console.log('Failed to generate thumbnail:', error);
    }
  };

  return (
    <>
      {thumbnailUrl && (
        <ImageBackground
          testID="videoThumbnail"
          source={{ uri: thumbnailUrl }}
          style={styles.video}
        >
          <View style={styles.videoInnerBackground}>
            <View style={styles.playButtonBackground}>
              <Entypo name="controller-play" size={SIZES.s24} color={COLORS.white} />
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};

const Message: React.FC<MessageProps> = ({
  isLeft,
  message,
  handleImage,
  handleVideo,
  openImage,
  openVideo,
}) => {
  const dateObj = new Date(message.insertedAt);
  const formattedTime = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const onRight = (type: string): object => {
    if (!isLeft) {
      switch (type) {
        case 'message':
          return {
            alignSelf: 'flex-end',
            borderTopRightRadius: 0,
            borderTopLeftRadius: SIZES.r10,
            backgroundColor: COLORS.lightGray,
          };
        case 'sticker':
          return {
            alignSelf: 'flex-end',
            borderTopRightRadius: 0,
            borderTopLeftRadius: SIZES.r10,
          };
        case 'text':
          return { color: COLORS.black };
        case 'icon':
          return { color: COLORS.primary400 };
        case 'time':
          return { color: COLORS.darkGray };
        case 'innerBackground':
          return { backgroundColor: COLORS.primary10 };
        case 'option':
          return { alignSelf: 'flex-end' };
      }
    }
  };

  const handleLink = () => {
    let url;
    switch (message.type) {
      case 'LOCATION':
        url = `https://www.google.com/maps/search/?api=1&query=${message.location.latitude},${message.location.longitude}`;
        break;
      case 'DOCUMENT':
        url = message.media.url;
        break;
      default:
        url = `${message.body}`;
        break;
    }
    Linking.openURL(url);
  };

  let messageBody, media_uri, media_ext, options;
  switch (message.type) {
    case 'IMAGE':
      media_uri = message.media.url;
      messageBody = (
        <Pressable
          testID="imageMessage"
          style={[styles.container, onRight('message')]}
          onPress={handleImage}
        >
          <ImageViewer message={message} handleImage={handleImage} openImage={openImage} />
          <Image source={{ uri: media_uri }} style={styles.image} />
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'VIDEO':
      media_uri = message.media.url;
      messageBody = (
        <Pressable
          testID="videoMessage"
          style={[styles.container, onRight('message')]}
          onPress={handleVideo}
        >
          <VideoPlayer message={message} handleVideo={handleVideo} openVideo={openVideo} />
          <VideoThumbnail videoUri={media_uri} />
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'AUDIO':
      media_uri = message.media.url;
      messageBody = (
        <Pressable testID="audioMessage" style={[styles.audioContainer, onRight('message')]}>
          <AudioPlayer audioUri={media_uri} isLeft={isLeft} />
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'DOCUMENT':
      media_uri = message.media.url;
      media_ext = media_uri.split('.').pop();
      messageBody = (
        <Pressable
          testID="documentMessage"
          style={[styles.container, onRight('message')]}
          onPress={handleLink}
        >
          <View style={[styles.docInnerContainer, onRight('innerBackground')]}>
            <AntDesign name="file1" style={[styles.docIcon, onRight('icon')]} />
            <View>
              <Text style={[styles.docText, onRight('text')]} numberOfLines={1}>
                {message.media.caption}
              </Text>
              <Text style={[styles.extensionText, onRight('text')]}>{media_ext}</Text>
            </View>
          </View>
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'STICKER':
      media_uri = message.media.url;
      messageBody = (
        <Pressable testID="stickerMessage" style={[styles.stickerContainer, onRight('sticker')]}>
          <Image source={{ uri: media_uri }} style={styles.stickerImage} />
          <Text style={[styles.time, styles.blackText, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'LOCATION':
      messageBody = (
        <Pressable
          testID="locationMessage"
          style={[styles.container, onRight('message')]}
          onPress={handleLink}
        >
          <Image source={require('../../assets/location.png')} style={styles.location} />
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'QUICK_REPLY':
      options = JSON.parse(message.interactiveContent)?.options;
      messageBody = (
        <View style={[styles.quickContainer, onRight('option')]}>
          <Pressable
            testID="quickReplyMessage"
            style={[styles.quickMessageContainer, onRight('message')]}
          >
            <Text style={[styles.text, onRight('text')]}>{message.body}</Text>
            <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
          </Pressable>
          <View style={styles.optionsContainer}>
            {options?.map((option, index) => (
              <Pressable key={index} testID={`quickOption${index}`} style={styles.optionButton}>
                <Text style={styles.optionText}>{option.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      );
      break;
    default:
      messageBody = (
        <Pressable testID="textMessage" style={[styles.container, onRight('message')]}>
          <Text style={[styles.text, onRight('text')]}>{message.body}</Text>
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
  }

  return messageBody;
};

export default Message;

const styles = StyleSheet.create({
  audioContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    margin: SIZES.m10,
    padding: SIZES.m10,
    width: '70%',
  },
  blackText: {
    color: COLORS.black,
  },
  container: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    margin: SIZES.m10,
    maxWidth: '70%',
    padding: SIZES.m10,
  },
  docIcon: {
    color: COLORS.white,
    fontSize: SIZES.f20,
    marginRight: SIZES.m10,
  },
  docInnerContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    borderRadius: SIZES.r10,
    flexDirection: 'row',
    paddingLeft: SIZES.m10,
    paddingRight: SIZES.m20,
    paddingVertical: SIZES.m12,
  },
  docText: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    fontWeight: '500',
    includeFontPadding: false,
    letterSpacing: 0.2,
    textTransform: 'capitalize',
  },
  extensionText: {
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    textTransform: 'uppercase',
  },
  image: {
    aspectRatio: 1,
    borderRadius: SIZES.r10,
    maxWidth: '100%',
    width: '100%',
  },
  location: {
    borderRadius: SIZES.r10,
    height: SCALE(108),
    width: SCALE(180),
  },
  optionButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary10,
    borderRadius: SIZES.r10,
    justifyContent: 'center',
    marginVertical: SCALE(2),
    padding: SIZES.m10,
    width: '100%',
  },
  optionText: {
    color: COLORS.primary400,
    fontSize: SIZES.f14,
    fontWeight: '500',
    includeFontPadding: false,
  },
  optionsContainer: {
    marginTop: SIZES.m4,
  },
  playButtonBackground: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    borderRadius: SIZES.r20,
    height: SIZES.s40,
    justifyContent: 'center',
    width: SIZES.s40,
  },
  quickContainer: {
    alignSelf: 'flex-start',
    margin: SIZES.m10,
    maxWidth: '70%',
  },
  quickMessageContainer: {
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    padding: SIZES.m10,
  },
  stickerContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.black005,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    margin: SIZES.m10,
    maxWidth: '70%',
    padding: SIZES.m10,
  },
  stickerImage: {
    aspectRatio: 1,
    borderRadius: SIZES.r10,
    maxWidth: '100%',
    width: '100%',
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    includeFontPadding: false,
    letterSpacing: 0.2,
  },
  time: {
    alignSelf: 'flex-end',
    bottom: -SIZES.m6,
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    position: 'relative',
  },
  video: {
    borderRadius: SIZES.r10,
    height: SCALE(160),
    width: '100%',
  },
  videoInnerBackground: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    borderRadius: SIZES.r10,
    flex: 1,
    justifyContent: 'center',
    minWidth: '100%',
  },
});
