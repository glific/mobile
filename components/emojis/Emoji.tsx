import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import shortnameToUnicode from './shortnameToUnicode';

interface EmojiProps {
  item: any;
  setMessage: any;
}

const Emoji: React.FC<EmojiProps> = ({ item, setMessage }) => {
  const handlePress = () => {
    setMessage((prev:any) => prev + shortnameToUnicode[`:${item}:`]);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.emojiContainer}>
      <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    marginHorizontal: 6.3,
    width: '9%',
  },
  emoji: {
    fontSize: 25,
  },
});

export default memo(Emoji);
