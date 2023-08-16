import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import moment from 'moment';

import { COLORS, SCALE, SIZES } from '../../constants';

const timefy = (ms: number): string => {
  if (!ms) return '00:00';
  const t = ms / 1000;
  const s = String(Math.floor(t % 60));
  const m = String(Math.floor(t / 60));
  return m.padStart(2, '0') + ':' + s.padStart(2, '0');
};

type VideoPlayerProps = {
  message: object;
  handleVideo: () => void;
  openVideo: boolean;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ message, handleVideo, openVideo }) => {
  const video = useRef(null);
  const [isPlay, setPlay] = useState(true);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const handlePlayPause = () => {
    if (video.current) {
      isPlay ? video.current.pauseAsync() : video.current.playAsync();
      setPlay((isPlay) => !isPlay);
    }
  };

  const handleVideoUpdate = (status: AVPlaybackStatus) => {
    setDuration(status.durationMillis);
  };

  const handlePlaybackUpdate = (status: AVPlaybackStatus) => {
    setPosition(status.positionMillis);
    if (status.positionMillis === duration) {
      setPlay((isPlay) => !isPlay);
    }
  };

  const onSlideEnd = (value: number) => {
    if (video.current) {
      video.current.setPositionAsync(value * duration);
      if (isPlay) {
        video.current.playAsync();
      }
    }
  };

  const calculateSeekBar = () => {
    if (duration && position) {
      return position / duration;
    }
    return 0;
  };

  return (
    <Modal transparent visible={openVideo} animationType={'fade'}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <AntDesign
            testID="backButton"
            name="arrowleft"
            style={styles.backButton}
            onPress={handleVideo}
          />
          <Text style={styles.headerText}>
            {moment(message.insertedAt).format('DD MMM, hh:mm A')}
          </Text>
        </View>

        <Video
          ref={video}
          source={{ uri: message.media.url }}
          style={styles.video}
          shouldPlay
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={handlePlaybackUpdate}
          onLoad={handleVideoUpdate}
        />

        <View style={styles.controlContainer}>
          {isPlay ? (
            <MaterialIcons name="pause" style={styles.controlIcon} onPress={handlePlayPause} />
          ) : (
            <Entypo name="controller-play" style={styles.controlIcon} onPress={handlePlayPause} />
          )}
          <Slider
            value={calculateSeekBar()}
            style={styles.track}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={COLORS.primary100}
            maximumTrackTintColor={COLORS.primary10}
            thumbTintColor={COLORS.primary100}
            onSlidingStart={() => video.current.pauseAsync()}
            onSlidingComplete={onSlideEnd}
          />
          <Text style={styles.timerText}>
            {timefy(position)} / {timefy(duration)}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: SCALE(22),
    paddingHorizontal: SIZES.m10,
  },
  container: {
    backgroundColor: COLORS.black,
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  controlContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SIZES.s70,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m16,
  },
  controlIcon: {
    color: COLORS.white,
    fontSize: SIZES.s24,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    flexDirection: 'row',
    height: SIZES.s60,
    paddingHorizontal: SIZES.m16,
    width: SIZES.width,
  },
  headerText: {
    color: COLORS.white,
    fontSize: SIZES.f14,
  },
  timerText: {
    color: COLORS.white,
    fontSize: SIZES.f12,
  },
  track: {
    flex: 1,
    height: 40,
  },
  video: {
    alignSelf: 'center',
    height: SCALE(240),
    width: SIZES.width,
  },
});
