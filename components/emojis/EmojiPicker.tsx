import React, { useState, memo } from 'react';
import { useWindowDimensions } from 'react-native';

import categories from './categories';
import EmojiCategory from './EmojiCategory';
import TabBar from './TabBar';

interface Tab {
  category: string;
  tabLabel: string;
}

interface EmojiPickerProps {
  setMessage: (message: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ setMessage }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<{ key: string; title: string }[]>(
    categories.tabs.map((tab: Tab) => ({ key: tab.category, title: tab.tabLabel }))
  );

  return (
    <>
      <TabBar setIndex={setIndex} index={index} routes={routes} />
      <EmojiCategory category={routes[index]?.key} setMessage={setMessage} />
    </>
  );
};

export default memo(EmojiPicker);
