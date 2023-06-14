import React, { memo } from 'react';
import { FlatList } from 'react-native';

import Emoji from './Emoji';
import { emojisByCategory } from './emojis';

interface EmojiCategoryProps {
  category: string;
  setMessage: any;
}

const EmojiCategory: React.FC<EmojiCategoryProps> = ({ category, setMessage }) => {
  return (
    <FlatList
      data={emojisByCategory[category]}
      renderItem={({ item }) => <Emoji item={item} setMessage={setMessage} />}
      keyExtractor={(item) => item}
      numColumns={8}
      style={{ height: 250, width: "100%" }}
    />
  );
};

export default memo(EmojiCategory);
