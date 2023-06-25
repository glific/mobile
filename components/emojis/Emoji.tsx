import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import shortnameToUnicode from './shortnameToUnicode';
import { EmojiProps } from '../../constants/types';

const Emoji: React.FC<EmojiProps> = ({ emoji, messageObj, cursor }) => {
  const handlePress = () => {
    messageObj.set(
      (prev: string) =>
        prev.slice(0, cursor?.value) + shortnameToUnicode[`:${emoji}:`] + prev.slice(cursor?.value)
    );
    cursor.set(cursor.value + 2);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.emojiContainer}>
      <Text style={styles.emoji}>{shortnameToUnicode[`:${emoji}:`]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emoji: {
    fontSize: 25,
  },
  emojiContainer: {
    marginHorizontal: 6.3,
    width: '9%',
  },
});

export default Emoji;
