import React, { useState } from 'react';
import categories from './categories';
import EmojiCategory from './EmojiCategory';
import TabBar from './TabBar';
import { CursorType, MessageObjectType } from '../../constants/types';

interface Tab {
  category: string;
  tabLabel: string;
}

interface EmojiPickerProps {
  messageObj: MessageObjectType;
  cursor: CursorType;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ messageObj, cursor }) => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<{ key: string; title: string }[]>(
    categories.tabs.map((tab: Tab) => ({ key: tab.category, title: tab.tabLabel }))
  );

  return (
    <>
      <TabBar setIndex={setIndex} index={index} routes={routes} />
      <EmojiCategory emoji={routes[index]?.key} messageObj={messageObj} cursor={cursor} />
    </>
  );
};

export default EmojiPicker;
