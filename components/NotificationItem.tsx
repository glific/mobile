import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'

type notificationType={
    header: String,
    message: String,
    time: String,
    type: String
}
const windowWidth = Dimensions.get('window').width;
const NotificationItem = (props:{notification: notificationType}) => {
    const {notification}= props;

    const getImage=(type:String)=>{
        if(type==="Critical")
        return  require('./images/critical.png');
        else if(type==="Info")
        return require('./images/info.png');
        else
        return require('./images/warning.png');
    }
  return (
    <View style={styles.container}>
        <View style={styles.imgContainer}>
            <Image
            source={getImage(notification.type)}
            style={styles.image}/>
        </View>
        <View style={styles.container2}>
        <Text style={styles.header}>{notification.header}</Text>
        <Text>{notification.message}</Text>
        <Text style={styles.time}>{notification.time}</Text>
        </View>
    </View>
  )
}

export default NotificationItem
const styles= StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        height: 116,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        alignItems:"center"
    },
    container2:{
        width:windowWidth-100
    },
    imgContainer:{
        margin:20
    },
    image:{
        height:48,
        width:48,
        borderRadius: 25
    },
    header:{
        fontWeight:"700",
        color: "#212121"
    },
    time:{
        color:"#6E8E7F",
        fontWeight:"700"
    }
})