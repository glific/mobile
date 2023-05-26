import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

type notificationType = {
  header: String;
  message: String;
  time: String;
  type: String;
};
const windowWidth = Dimensions.get('window').width;
const NotificationItem = (props: { notification: notificationType }) => {
  const { notification } = props;
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {notification.type === 'Info' ? (
          <View style={styles.info}>
            <MaterialCommunityIcons name="message-text-outline" size={24} color="#218AFF" />
          </View>
        ) : (
          <>
            {notification.type === 'Critical' ? (
              <View style={styles.critical}>
                <AntDesign name="setting" size={24} color="#767672" />
              </View>
            ) : (
              <View style={styles.warning}>
                <AntDesign name="warning" size={24} color="#DD1F1F" />
              </View>
            )}
          </>
        )}
      </View>
      <View style={styles.container2}>
        <Text style={styles.header}>{notification.header}</Text>
        <Text>{notification.message}</Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 116,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  container2: {
    width: windowWidth - 100,
  },
  imgContainer: {
    margin: 20,
  },
  info: {
    height: 48,
    width: 48,
    borderRadius: 25,
    backgroundColor: '#D7E6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#218AFF',
    borderWidth: 1,
  },
  warning: {
    height: 48,
    width: 48,
    borderRadius: 25,
    backgroundColor: '#EFD6D6',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#DD1F1F',
    borderWidth: 1,
  },
  critical: {
    height: 48,
    width: 48,
    borderRadius: 25,
    backgroundColor: '#EAEDEC',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#767672',
    borderWidth: 1,
  },
  header: {
    fontWeight: '700',
    color: '#212121',
  },
  time: {
    color: '#6E8E7F',
    fontWeight: '700',
  },
});
