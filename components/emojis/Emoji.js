import React, { memo } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import shortnameToUnicode from '../helpers/shortnameToUnicode';

const Emoji = ({ item }) => {
	return (
		<TouchableOpacity style={styles.emojiContainer}>
			<Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	emojiContainer: {
		marginHorizontal: 9
	},
	emoji: {
		fontSize: 25
	}
})

export default Emoji