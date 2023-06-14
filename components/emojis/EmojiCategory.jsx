import React, { memo } from 'react'
import { FlatList, Dimensions } from 'react-native'

import Emoji from './Emoji';
import { emojisByCategory } from './emojis';


const EmojiCategory = ({ category,setMessage }) => {
	return (
			<FlatList
				data={emojisByCategory[category]}
				renderItem={({ item }) => <Emoji item={item} setMessage={setMessage}/>}
				keyExtractor={(item) => item}
				numColumns={8}
				style={{ height: 250,width:"100%" }}
			/>
	)
}

export default memo(EmojiCategory);