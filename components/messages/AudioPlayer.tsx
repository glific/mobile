import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

import { COLORS, SIZES } from '../../constants';

interface AudioPlayerProps {
  audio: string;
  isLeft: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio, isLeft }) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundObject = useRef(new Audio.Sound()).current;

  useEffect(() => {
    const loadSound = async () => {
      try {
        await soundObject.loadAsync({ uri: audio });
        const { durationMillis } = await soundObject.getStatusAsync();
        setDuration(durationMillis);
      } catch (error) {
        console.log('LoadSound: ', error);
      }
    };
    loadSound();
    return async () => {
      await soundObject.unloadAsync();
    };
  }, [audio]);

  const pause = async () => {
    try {
      return await soundObject.pauseAsync();
    } catch (error) {
      console.log('Pause: ', error);
    }
  };

  const handlePlayPause = async () => {
    try {
      if (playing) {
        await pause();
        setPlaying(false);
      } else {
        await soundObject.playFromPositionAsync(currentTime);
        setPlaying(true);
      }
    } catch (error) {
      console.log('handlePlayPause; ', error);
    }
  };

  const moveAudio = async (value: number) => {
    try {
      const status = await soundObject.setPositionAsync(Math.floor(duration * value));
      setCurrentTime(status.positionMillis);
      await soundObject.playFromPositionAsync(currentTime);
    } catch (error) {
      console.log('moveAudio: ', error);
    }
  };

  const calculateSeekBar = () => {
    if (duration > 0) return currentTime / duration;
    return 0;
  };

  async function onSlide(value: number) {
    // const { positionMillis } = await soundObject.getStatusAsync();
    setCurrentTime(value * duration);
  }

  const convertTime = (milliseconds: number): string => {
    if (milliseconds) {
      const seconds: number = Math.floor(milliseconds / 1000);

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds - minutes * 60;

      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');

      return `${formattedMinutes}:${formattedSeconds}`;
    }
    return '00:00';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause}>
        {playing ? (
          <MaterialIcons
            name="pause"
            size={SIZES.s24}
            color={isLeft ? COLORS.white : COLORS.primary400}
          />
        ) : (
          <Entypo
            name="controller-play"
            size={SIZES.s24}
            color={isLeft ? COLORS.white : COLORS.primary400}
          />
        )}
      </TouchableOpacity>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={calculateSeekBar()}
        minimumTrackTintColor={isLeft ? COLORS.white : COLORS.primary400}
        maximumTrackTintColor={COLORS.black}
        thumbTintColor={isLeft ? COLORS.white : COLORS.primary400}
        onValueChange={(value) => {
          onSlide(value);
        }}
        onSlidingStart={async () => {
          if (playing) {
            await pause();
          }
        }}
        onSlidingComplete={async (value) => {
          await moveAudio(value);
        }}
      />
      <Text style={[styles.time, { color: isLeft ? COLORS.white : COLORS.black }]}>
        {convertTime(currentTime)}
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
