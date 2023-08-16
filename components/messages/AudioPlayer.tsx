import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

import { COLORS, SIZES } from '../../constants';

const timefy = (ms: number): string => {
  if (!ms) return '00:00';
  const t = ms / 1000;
  const s = String(Math.floor(t % 60));
  const m = String(Math.floor(t / 60));
  return m.padStart(2, '0') + ':' + s.padStart(2, '0');
};

interface AudioPlayerProps {
  audioUri: string;
  isLeft: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUri, isLeft }) => {
  const audio = useRef(new Audio.Sound()).current;
  const [isPlay, setPlay] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const loadSound = async () => {
      try {
        if (audio) {
          await audio.loadAsync({ uri: audioUri });
          const { durationMillis } = await audio.getStatusAsync();
          setDuration(durationMillis);
        }
      } catch (error) {
        console.log('LoadSound: ', error);
      }
    };
    loadSound();
    return async () => {
      await audio.unloadAsync();
    };
  }, [audioUri]);

  const handlePlayPause = () => {
    if (audio) {
      isPlay ? audio.pauseAsync() : audio.playFromPositionAsync(position);
      setPlay((isPlay) => !isPlay);
    }
  };

  const onSlideEnd = async (value: number) => {
    const status = await audio.setPositionAsync(duration * value);
    setPosition(status.positionMillis);
    if (isPlay) {
      await audio.playAsync();
    }
  };

  const calculateSeekBar = () => {
    if (duration && position) {
      return position / duration;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      {isPlay ? (
        <MaterialIcons
          name="pause"
          size={SIZES.s24}
          color={isLeft ? COLORS.white : COLORS.primary400}
          onPress={handlePlayPause}
        />
      ) : (
        <Entypo
          name="controller-play"
          size={SIZES.s24}
          color={isLeft ? COLORS.white : COLORS.primary400}
          onPress={handlePlayPause}
        />
      )}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={calculateSeekBar()}
        minimumTrackTintColor={isLeft ? COLORS.white : COLORS.primary400}
        maximumTrackTintColor={COLORS.black}
        thumbTintColor={isLeft ? COLORS.white : COLORS.primary400}
        onSlidingStart={async () => {
          await audio.pauseAsync();
        }}
        onSlidingComplete={onSlideEnd}
      />
      <Text style={[styles.time, { color: isLeft ? COLORS.white : COLORS.black }]}>
        {timefy(position)}
      </Text>
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SIZES.s36,
  },
  slider: {
    flex: 1,
    height: SIZES.s40,
  },
  time: {
    fontSize: SIZES.f12,
  },
});
