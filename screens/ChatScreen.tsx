import { StyleSheet, Text, View,SafeAreaView,FlatList,StatusBar, Pressable,Modal} from "react-native";
import Storage from "../utils/asyncStorage";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import ChatHeader from "../components/ui/messages/ChatHeader";
import MessagesList from "../components/ui/messages/MessageList";
import ChatInput from "../components/ui/messages/ChatInput";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from "../theme";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';




 
 

type RootStackParamList = {
    Login: undefined;
    Chat: undefined;
    ChatScreen: undefined;
  };
  
  type Props = NativeStackScreenProps<RootStackParamList, "ChatScreen">;



const ChatScreen = ({ navigation }: Props) => {
  

  const [reply, setReply] = useState("");
  const [isLeft, setIsLeft] = useState(false);
  const [showModal,setshowModal]=useState(false);

  const swipeToReply = (message:string, isLeft:boolean) => {
      setReply(message.length > 50 ? message.slice(0, 50) + '...' : message);
      setIsLeft(isLeft);
  };

  const closeReply = () => {
      setReply("");
  };
  
  const handleModal=(Data:boolean)=>{

    setshowModal(Data)
  }

 

  return (
    
    <View style={{ flex: 1 }}>
			<ChatHeader data={handleModal}/>
      <Modal
        visible={showModal}
        transparent
        onRequestClose={() =>
          setshowModal(false)
        }
        animationType='slide'
        hardwareAccelerated
      >
        <View style={styles.upright_view}>
        <Pressable
              onPress={() => setshowModal(false)}
              style={styles.warning_button}
              android_ripple={{color:'#fff'}}
            >
              <Icon
							name="ellipsis-v"
							size={25}
							color={theme.colors.white}
              style={{marginLeft:225}}
							
						/>
            </Pressable>
          <View style={styles.warning_modal}>
           
            <View style={styles.warning_body}>
            <Ionicons name="person-add-sharp" size={22} color="#119656" style={{padding:4,marginTop:6}} />
              <Text style={styles.text}>Add to Collection</Text>
            </View>
            <View style={styles.warning_body}>
            <MaterialCommunityIcons name="message-bulleted-off" size={22} color="#119656" style={{padding:4,marginTop:8}} />
              <Text style={styles.text}>Clear Conversation</Text>
            </View>
            <View style={styles.warning_body}>
            <MaterialCommunityIcons name="hand-back-right-off" size={22} color="#119656" style={{padding:4,marginTop:8}} />
              <Text style={styles.text}>Terminate Flows</Text>
            </View>
            <View style={styles.warning_body}>
            <Entypo name="block" size={22} color="red" style={{padding:4,marginTop:8}} />
              <Text style={{color:'red',fontSize: 20,
    margin: 10,
    textAlign: 'center',}}>Block Contact </Text>
            </View>
           
          </View>
        </View>
      </Modal>
      <View style={styles.item}>
                <Text style={styles.time}>Time left: 24</Text>
            </View>
			<MessagesList onSwipeToReply={swipeToReply} />
      
			<ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply} username="username" />
            
		</View>
   
);
};



const styles = StyleSheet.create({

  item: {
    backgroundColor: '#F2F2F2',
    padding:8,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    
  },
  name: {
    fontSize: 22,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  
  },
  time:{
    fontSize:18,
    fontWeight:'bold'
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
  },
  upright_view: {
    flex: 1,
    marginLeft:100,
   
    marginTop:23,
   
  },
  warning_modal: {
    width: 240,
    height: 220,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 8,
    marginTop:10,
    
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
   
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    padding:4,
    flexDirection:'row'
    
  },
  warning_button:{
  
   
  }
});

export default ChatScreen;
