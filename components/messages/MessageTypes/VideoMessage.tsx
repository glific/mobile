import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { getThumbnailAsync } from 'expo-video-thumbnails';
import { Entypo } from '@expo/vector-icons';

import { MessageType } from '../Message';
import VideoPlayer from '../VideoPlayer';
import { MessageTime, onRight } from './AudioMessage';
import { COLORS, SCALE, SIZES } from '../../../constants';

const VideoThumbnail = ({ videoUri }: { videoUri: string }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const generateThumbnail = async (url: string) => {
    try {
      const { uri } = await getThumbnailAsync(url, {
        time: 4000,
      });
      setThumbnailUrl(uri);
    } catch (error) {
      console.log('Failed to generate thumbnail:', error);
    }
  };

  useEffect(() => {
    generateThumbnail(videoUri);
  }, [videoUri]);

  if (!thumbnailUrl) {
    return null;
  }

  return (
    <ImageBackground testID="videoThumbnail" source={{ uri: thumbnailUrl }} style={styles.video}>
      <View style={styles.videoInnerBackground}>
        <View style={styles.playButtonBackground}>
          <Entypo name="controller-play" size={SIZES.s24} color={COLORS.white} />
        </View>
      </View>
    </ImageBackground>
  );
};

interface Props {
  message: MessageType;
  handleVideo: () => void;
  openVideo: boolean;
  time: string;
  isLeft: boolean;
}

const VideoMessage = ({ message, openVideo, handleVideo, time, isLeft }: Props) => {
  return (
    <Pressable
      testID="videoMessage"
      style={[styles.container, onRight('message', isLeft)]}
      onPress={handleVideo}
    >
      <VideoPlayer message={message} handleVideo={handleVideo} openVideo={openVideo} />
      <VideoThumbnail videoUri={message.media.url} />
      <MessageTime time={time} isLeft={isLeft} />
    </Pressable>
  );
};

export default VideoMessage;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary400,
    borderRadius: SIZES.r10,
    borderTopLeftRadius: 0,
    margin: SIZES.m10,
    maxWidth: '70%',
    padding: SIZES.m10,
  },
  playButtonBackground: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    borderRadius: SIZES.r20,
    height: SIZES.s40,
    justifyContent: 'center',
    width: SIZES.s40,
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
