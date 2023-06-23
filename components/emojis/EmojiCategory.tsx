import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Emoji from './Emoji';
import { emojisByCategory } from './emojis';

interface MessageObjectType {
  set: React.Dispatch<React.SetStateAction<string>>;
  value: string | null;
}
interface CursorType {
  set: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}
interface EmojiCategoryProps {
  category: string;
  messageObj: MessageObjectType;
  cursor: CursorType;
}

const EmojiCategory: React.FC<EmojiCategoryProps> = ({ category, messageObj, cursor }) => {
  return (
    <FlatList
      data={emojisByCategory[category]}
      renderItem={({ item }) => <Emoji item={item} messageObj={messageObj} cursor={cursor} />}
      keyExtractor={(item) => item}
      numColumns={8}
      style={styles.emojiElement}
    />
  );
};

export default EmojiCategory;

const styles = StyleSheet.create({
  emojiElement: {
    height: 250,
    width: '100%',
  },
});
