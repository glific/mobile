import React, { useState, useEffect} from "react";
import {View,Text,StyleSheet,TextInput,Platform,TouchableOpacity,} from "react-native";
import Animated, {useSharedValue,withSpring,withTiming,useAnimatedStyle} from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import EmojiPicker from "../emojis/EmojiPicker";
import { AntDesign } from '@expo/vector-icons';
import { theme } from "../../theme";

const ChatInput = ({ reply, closeReply, isLeft, username }) => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const height = useSharedValue(70);

	useEffect(() => {
		if (showEmojiPicker) {
			height.value = withTiming(400);
		} else {
			height.value = reply ? withSpring(130) : withSpring(70);
		}
	}, [showEmojiPicker]);

	useEffect(() => {
		if (reply) {
			height.value = showEmojiPicker ? withTiming(450) : withTiming(130);
		} else {
			height.value = showEmojiPicker ? withSpring(400) : withSpring(70);
		}
	}, [reply]);

	const heightAnimatedStyle = useAnimatedStyle(() => {
		return {
			height: height.value
		}
	})


	return (
		<Animated.View style={[styles.container, heightAnimatedStyle]}>
			{reply ? (
				<View style={styles.replyContainer}>
					
					<TouchableOpacity
						onPress={closeReply}
						style={styles.closeReply}
					>
						<Icon name="close" color="#000" size={20} />
					</TouchableOpacity>
					<Text style={styles.title}>
						Response to {isLeft ? username : "Me"}
					</Text>
					<Text style={styles.reply}>{reply}</Text>
				</View>
			) : null}
			<View style={styles.innerContainer}>
			<AntDesign name="up" size={18} color="black" style={{marginRight:10}} />
				<View style={styles.inputAndMicrophone}>
					<TouchableOpacity
						style={styles.emoticonButton}
						onPress={() => setShowEmojiPicker((value) => !value)}
					>
						<Icon
							name={
								showEmojiPicker ? "close" : "emoticon-outline"
							}
							size={23}
							color={theme.colors.description}
						/>
					</TouchableOpacity>
					<TextInput
						multiline
						placeholder={"Start Typing..."}
						style={styles.input}
						value={message}
						onChangeText={(text) => setMessage(text)}
					/>
					<TouchableOpacity style={styles.rightIconButtonStyle}>
						<Icon
							name="paperclip"
							size={23}
							color={theme.colors.description}
							style={{transform: [{ rotate: '50deg' }],
					}}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.sendButton}>
					<View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
					<Ionicons name="chatbox-sharp" size={32} color="white" style={{alignItems:'center',justifyContent:'center',position:'absolute'}}
					 />
					 <FontAwesome name="send" size={16} color="green" style={{justifyContent:'center',alignItems:'center',position:'relative',marginBottom:5}} />
					</View>
					
				</TouchableOpacity>
			</View>
			<EmojiPicker />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		backgroundColor: theme.colors.white,
	},
	replyContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	title: {
		marginTop: 5,
		fontWeight: "bold",
	},
	closeReply: {
		position: "absolute",
		right: 10,
		top: 5,
	},
	reply: {
		marginTop: 5,
	},
	innerContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 10,
	},
	inputAndMicrophone: {
		flexDirection: "row",
		backgroundColor: theme.colors.inputBackground,
		flex: 3,
		marginRight: 10,
		paddingVertical: Platform.OS === "ios" ? 10 : 0,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		backgroundColor: "transparent",
		paddingLeft: 20,
		color: theme.colors.inputText,
		flex: 3,
		fontSize: 15,
		height: 50,
		alignSelf: "center",
	},
	rightIconButtonStyle: {
		justifyContent: "center",
		alignItems: "center",
		paddingRight: 15,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: "#fff",
	
	},
	swipeToCancelView: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 30,
	},
	swipeText: {
		color: theme.colors.description,
		fontSize: 15,
	},
	emoticonButton: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
	},
	recordingActive: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 10,
	},
	recordingTime: {
		color: theme.colors.description,
		fontSize: 20,
		marginLeft: 5,
	},
	microphoneAndLock: {
		alignItems: "center",
		justifyContent: "flex-end",
	},
	lockView: {
		backgroundColor: "#eee",
		width: 60,
		alignItems: "center",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		height: 130,
		paddingTop: 20,
	},
	sendButton: {
		backgroundColor: '#119656',
		borderRadius: 50,
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
		flexDirection:'row'
	},
});

export default ChatInput;