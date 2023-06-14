import React, { useState, memo } from 'react'
import {useWindowDimensions } from 'react-native';

import categories from './categories';
import EmojiCategory from './EmojiCategory';
import TabBar from './TabBar';

const EmojiPicker = ({setMessage}) => {
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [routes, setRoutes] = useState(categories.tabs.map(tab => ({ key: tab.category, title: tab.tabLabel })));

	return (
		<>
		<TabBar setIndex={setIndex} index={index} routes={routes} />
		<EmojiCategory category={routes[index]?.key} setMessage={setMessage}/>
		</>
	)
}

export default memo(EmojiPicker);