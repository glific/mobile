import React from 'react';
import { FlatList } from 'react-native';

import Emoji from './Emoji';
import { emojisByCategory } from './emojis';

interface EmojiCategoryProps {
  category: string;
  messageObj: any;
  cursor: any;
}

const EmojiCategory: React.FC<EmojiCategoryProps> = ({ category, messageObj, cursor}) => {
  return (
    <FlatList
      data={emojisByCategory[category]}
      renderItem={({ item }) => <Emoji item={item} messageObj={messageObj} cursor={cursor} />}
      keyExtractor={(item) => item}
      numColumns={8}
      style={{ height: 250, width: "100%" }}
    />
  );
};

export default EmojiCategory;
