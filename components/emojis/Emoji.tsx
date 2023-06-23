import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import shortnameToUnicode from './shortnameToUnicode';

interface MessageObjectType {
  set: React.Dispatch<React.SetStateAction<string>>;
  value: string | null;
}
interface CursorType {
  set: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}
interface EmojiProps {
  item: string;
  messageObj: MessageObjectType;
  cursor: CursorType;
}

const Emoji: React.FC<EmojiProps> = ({ item, messageObj, cursor }) => {
  const handlePress = () => {
    messageObj.set(
      (prev: string) =>
        prev.slice(0, cursor?.value) + shortnameToUnicode[`:${item}:`] + prev.slice(cursor?.value)
    );
    cursor.set(cursor.value + 2);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.emojiContainer}>
      <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
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
