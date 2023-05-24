import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../constants/styles';

const ChatInput = ({ reply, closeReply, isLeft, username }: any) => {
  const [message, setMessage] = useState('');
  const height = useSharedValue(70);

  const heightAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return (
    <Animated.View style={[styles.container, heightAnimatedStyle]}>
      {reply ? (
        <View style={styles.replyContainer}>
          <TouchableOpacity onPress={closeReply} style={styles.closeReply}>
            <Icon name="close" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Response to {isLeft ? username : 'Me'}</Text>
          <Text style={styles.reply}>{reply}</Text>
        </View>
      ) : null}
      <View style={styles.innerContainer}>
        <AntDesign name="up" size={18} color="black" style={styles.upicon} />
        <View style={styles.inputAndMicrophone}>
          <TouchableOpacity style={styles.emoticonButton}>
            <Icon name={'emoticon-outline'} size={23} color={Colors.description} />
          </TouchableOpacity>
          <TextInput
            multiline
            placeholder={'Start Typing...'}
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Icon
              name="paperclip"
              size={23}
              color={Colors.description}
              style={styles.paperclipicon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <View style={styles.firsticonview}>
            <Ionicons name="chatbox-sharp" size={32} color="white" style={styles.iconchatbox} />
            <FontAwesome name="send" size={16} color="green" style={styles.sendicon} />
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  closeReply: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  upicon: { marginRight: 10 },
  reply: {
    marginTop: 5,
  },
  paperclipicon: {
    transform: [{ rotate: '50deg' }],
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBackground,
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    color: Colors.inputText,
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: 'center',
  },
  firsticonview: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconchatbox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
  },
  swipeToCancelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  swipeText: {
    color: Colors.description,
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  recordingTime: {
    color: Colors.description,
    fontSize: 20,
    marginLeft: 5,
  },
  microphoneAndLock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lockView: {
    backgroundColor: '#eee',
    width: 60,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 130,
    paddingTop: 20,
  },
  sendicon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 5,
  },
  sendButton: {
    backgroundColor: '#119656',
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default ChatInput;
