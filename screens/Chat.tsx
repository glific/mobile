import { StyleSheet, Text, View,SafeAreaView,FlatList,StatusBar, Pressable} from "react-native";
import Storage from "../utils/asyncStorage";
import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Chat: undefined;
  ChatScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;
const DATA = [
  {
    id: '1',
    name: 'Chandra',
  },
  {
    id: '2',
    name: 'Abhishek',
  },
  {
    id: '3',
    name: 'Kunal',
  },
  {
    id: '4',
    name: 'Rahul',
  },
  {
    id: '5',
    name: 'Khemu',
  },
  {
    id: '6',
    name: 'Michael',
  },
];

 
 


type ItemProps = {name: string};


const Chat = ({ navigation }: Props) => {
  const [session, setSession] = useState<object | null>({});

  useEffect(() => {
    // Retrieve the session from AsyncStorage
    const getSession = async () => {
      const sessionValue = await Storage.getData("session");
      if (sessionValue !== null) {
        const parsedSessionValue = JSON.parse(sessionValue);
        setSession(parsedSessionValue);
      }
    };

    getSession();
  }, []);
  const Item = ({name}: ItemProps) => (
    <Pressable onPress={()=>
      navigation.navigate("ChatScreen")
    }>
    <View style={styles.item}>
      <View style={styles.avatar}>
         <Text style={{justifyContent:"center",alignItems:"center",paddingLeft:19,paddingTop:12,fontSize:18}}>{name.charAt(0)}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
    </Pressable>
  );
  

  const LogoutHandler = async () => {
    await Storage.removeData("session");
    setSession({});
    navigation.navigate("Login");
  };

  return (
    
      <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item name={item.name} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
     
  );
};


const styles = StyleSheet.create({
  container: {
   
    marginTop: 0,
  },
  item: {
    backgroundColor: '#F2F2F2',
    padding: 5,
    marginVertical: 1,
    marginHorizontal: 2,
    flexDirection: 'row', alignItems:'center',
    height:60,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    
   
    
  },
  name: {
    fontSize: 22,
    marginLeft:18
    
  
  },
  avatar:{
    height: 50,
		width: 50,
		borderRadius: 25.5,
    backgroundColor:'#a8ee90',
    flexDirection:'row',
    
    alignItems:'flex-start'

  }
});

export default Chat;
