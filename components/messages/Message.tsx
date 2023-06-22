import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Linking, Pressable, ImageBackground } from 'react-native';

import { COLORS, SCALE, SIZES } from '../../constants';
import { AntDesign, Entypo, Octicons } from '@expo/vector-icons';
import AudioPlayer from './AudioPlayer';
import * as VideoThumbnails from 'expo-video-thumbnails';

type MessageProps = {
  isLeft: boolean;
  message: {
    id: number;
    type: string;
    body: string;
    contextMessage: any;
    media: any;
    insertedAt: string;
    flowLabel: string | null;
    interactiveContent: string;
    location: any;
    messageNumber?: any;
    receiver: {
      id: number;
    };
    sender: {
      id: number;
    };
    errors: any;
    sendBy: string;
  };
};

const VideoThumbnail = ({ video }: { video: string }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    generateThumbnail(video);
  }, [video]);

  const generateThumbnail = async (url: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
        time: 10000,
      });
      setThumbnailUrl(uri);
    } catch (error) {
      console.error('Failed to generate thumbnail:', error);
    }
  };

  return (
    <>
      {thumbnailUrl && (
        <ImageBackground source={{ uri: thumbnailUrl }} style={styles.video}>
          <View style={styles.videoInnerBackground}>
            <Entypo name="controller-play" size={SIZES.s24} color={COLORS.white} />
          </View>
        </ImageBackground>
      )}
    </>
  );
};

const Message: React.FC<MessageProps> = ({ isLeft, message }) => {
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
        default:
          return {};
      }
    }
  };

  const handlePress = () => {
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

  let messageBody, media_uri, media_ext;
  switch (message.type) {
    case 'IMAGE':
      media_uri = message.media.url;
      messageBody = (
        <Pressable style={[styles.container, onRight('message')]}>
          <Image source={{ uri: media_uri }} style={styles.image} />
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'VIDEO':
      media_uri = message.media.url;
      messageBody = (
        <Pressable style={[styles.container, onRight('message')]}>
          <VideoThumbnail video={media_uri} />
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'AUDIO':
      media_uri = message.media.url;
      messageBody = (
        <Pressable style={[styles.audioContainer, onRight('message')]}>
          <AudioPlayer audio={media_uri} isLeft={isLeft} />
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'DOCUMENT':
      media_uri = message.media.url;
      media_ext = media_uri.split('.').pop();
      messageBody = (
        <Pressable style={[styles.container, onRight('message')]} onPress={handlePress}>
          <View style={[styles.docInnerContainer, onRight('innerBackground')]}>
            <AntDesign name="file1" style={[styles.docIcon, onRight('icon')]} />
            <View style={{ marginHorizontal: SIZES.m10 }}>
              <Text style={[styles.text, onRight('text')]} numberOfLines={1}>
                {message.media.caption}
              </Text>
              <Text style={[styles.extensionText, onRight('text')]}>{media_ext}</Text>
            </View>
            <Octicons name="download" style={[styles.docIcon, onRight('icon')]} />
          </View>
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'STICKER':
      media_uri = message.media.url;
      messageBody = (
        <Pressable style={[styles.stickerContainer, onRight('sticker')]}>
          <Image source={{ uri: media_uri }} style={styles.stickerImage} />
          <Text style={[styles.time, styles.blackText, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    case 'LOCATION':
      messageBody = (
        <Pressable style={[styles.container, onRight('message')]} onPress={handlePress}>
          <Image source={require('../../assets/location.png')} style={styles.location} />
          <Text style={[styles.time, onRight('time')]}>{formattedTime}</Text>
        </Pressable>
      );
      break;
    default:
      messageBody = (
        <Pressable style={[styles.container, onRight('message')]}>
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
    fontSize: SIZES.f18,
  },
  docInnerContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    borderRadius: SIZES.r10,
    flexDirection: 'row',
    padding: SIZES.m10,
  },
  extensionText: {
    color: COLORS.lightGray,
    fontSize: SIZES.f10,
    textTransform: 'uppercase',
  },
  image: {
    aspectRatio: 1,
    borderRadius: 10,
    maxWidth: '100%',
    width: '100%',
  },
  location: {
    borderRadius: SIZES.r10,
    height: SCALE(120),
    width: SCALE(200),
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
    borderRadius: 10,
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
    borderRadius: 10,
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
