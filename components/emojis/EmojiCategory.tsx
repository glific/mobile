import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Emoji from './Emoji';
import { emojisByCategory } from './emojis';
import { EmojiProps } from '../../constants/types';

const EmojiCategory: React.FC<EmojiProps> = ({ emoji, messageObj, cursor }) => {
  return (
    <FlatList
      data={emojisByCategory[emoji]}
      renderItem={({ item }) => <Emoji emoji={item} messageObj={messageObj} cursor={cursor} />}
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
