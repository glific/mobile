import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotificationItem from '../components/NotificationItem';

type notificationType = {
  header: String;
  message: String;
  time: String;
  type: String;
};
const Notifications = () => {
  const Notifications: notificationType[] = [
    {
      header: 'Glific stimulator four',
      message: 'Sorry! 24 hrs window closed. Your message cannot be sent at this time.',
      time: '15 min',
      type: 'Warning',
    },
    {
      header: 'Glific stimulator four',
      message:
        'Sorry! 24 hrs window closed. Your message cannot be sent at this time. Hello How are you? Are you fine',
      time: '20 min',
      type: 'Warning',
    },
    {
      header: 'Glific stimulator four',
      message: 'Sorry! 24 hrs window closed. Your message cannot be sent at this time.',
      time: '20 min',
      type: 'Critical',
    },
    {
      header: 'Glific stimulator four',
      message: 'Sorry! 24 hrs window closed. Your message cannot be sent at this time.',
      time: '1 hour',
      type: 'Info',
    },
    {
      header: 'Glific stimulator four',
      message: 'Sorry! 24 hrs window closed. Your message cannot be sent at this time.',
      time: '1 hour',
      type: 'Info',
    },
  ];

  const [option, setOption] = useState('All');
  const [notificationArray, setNotificationArray] = useState(Notifications);
  const pressedAll = () => {
    setOption('All');
    setNotificationArray(Notifications);
  };
  const pressedCritical = () => {
    setOption('Critical');
    const filteredArray = filterArrayByField('Critical');
    setNotificationArray(filteredArray);
  };
  const pressedWarning = () => {
    setOption('Warning');
    const filteredArray = filterArrayByField('Warning');
    setNotificationArray(filteredArray);
  };
  const pressedInfo = () => {
    setOption('Info');
    const filteredArray = filterArrayByField('Info');
    setNotificationArray(filteredArray);
  };

  function filterArrayByField(value: String): notificationType[] {
    return Notifications.filter((item) => item['type'] === value);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.navBar}>
        <View style={option === 'All' ? styles.option : {}}>
          <TouchableOpacity onPress={pressedAll}>
            <Text style={[styles.text, option === 'All' ? styles.active : {}]}>ALL</Text>
          </TouchableOpacity>
        </View>
        <View style={option === 'Critical' ? styles.option : {}}>
          <TouchableOpacity onPress={pressedCritical}>
            <Text style={[styles.text, option === 'Critical' ? styles.active : {}]}>CRITICAL</Text>
          </TouchableOpacity>
        </View>
        <View style={option === 'Warning' ? styles.option : {}}>
          <TouchableOpacity onPress={pressedWarning}>
            <Text style={[styles.text, option === 'Warning' ? styles.active : {}]}>WARNING</Text>
          </TouchableOpacity>
        </View>
        <View style={option === 'Info' ? styles.option : {}}>
          <TouchableOpacity onPress={pressedInfo}>
            <Text style={[styles.text, option === 'Info' ? styles.active : {}]}>INFO</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {notificationArray.map((item) => {
          return <NotificationItem key={notificationArray.indexOf(item)} notification={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    height: 59,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 17,
    paddingRight: 90,
    backgroundColor: '#ECF7F1',
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6E8E7F',
    marginTop: 11,
    marginBottom: 11,
  },
  active: {
    color: '#073F24',
  },
  option: {
    borderBottomWidth: 2,
    borderBottomColor: '#073F24',
  },
});
