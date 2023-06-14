import React, { memo } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import shortnameToUnicode from './shortnameToUnicode';

const Emoji = ({ item,setMessage }) => {
	return (
		<TouchableOpacity onPress={()=>{setMessage(prev=>prev+shortnameToUnicode[`:${item}:`])}} style={styles.emojiContainer}>
			<Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	emojiContainer: {
		marginHorizontal: 6.3,
		width:'9%',
	},
	emoji: {
		fontSize: 25,
	}
})

export default Emoji