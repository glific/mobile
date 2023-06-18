import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { Dispatch, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotificationItem from '../components/NotificationItem';
import { COLORS } from '../constants/theme';
import { GET_NOTIFICATIONS } from '../graphql/queries/Notification';
import { useQuery } from '@apollo/client';
import { getTimeDifference } from '../utils/timeDuration';

type notificationType = {
  header: string;
  message: string;
  time: string;
  type: string;
};

let Notification: notificationType[] = [];

const formatNotifications = (notifications: object[]): notificationType[] => {
  return notifications.map((notification) => {
    const { entity, message, updatedAt, severity } = notification;
    const { name, phone } = JSON.parse(entity);
    return {
      header: name || phone,
      message,
      time: getTimeDifference(updatedAt),
      type: severity.replace(/"/g, ''),
    };
  });
};

const Notifications = () => {
  const [option, setOption] = useState('All');
  const [notificationArray, setNotificationArray] = useState(Notification);

  useQuery(GET_NOTIFICATIONS, {
    onCompleted: (data) => {
      Notification = formatNotifications(data.notifications);
      setNotificationArray(Notification);
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.navBar}>
        <RenderOption
          label="All"
          selectedOption={option}
          setNotificationArray={setNotificationArray}
          setOption={setOption}
        />
        <RenderOption
          label="Critical"
          selectedOption={option}
          setNotificationArray={setNotificationArray}
          setOption={setOption}
        />
        <RenderOption
          label="Warning"
          selectedOption={option}
          setNotificationArray={setNotificationArray}
          setOption={setOption}
        />
        <RenderOption
          label="Info"
          selectedOption={option}
          setNotificationArray={setNotificationArray}
          setOption={setOption}
        />
      </View>
      <ScrollView>
        {notificationArray.map((item) => {
          return <NotificationItem key={notificationArray.indexOf(item)} notification={item} />;
        })}
      </ScrollView>
    </View>
  );
};

const RenderOption = ({
  label,
  selectedOption,
  setNotificationArray,
  setOption,
}: {
  label: string;
  selectedOption: string;
  setNotificationArray: Dispatch<React.SetStateAction<notificationType[]>>;
  setOption: Dispatch<React.SetStateAction<string>>;
}) => {
  const handleOptionPress = (option: string) => {
    setOption(option);
    if (option === 'All') {
      setNotificationArray(Notification);
    } else {
      const filteredArray = filterArrayByField(option);
      setNotificationArray(filteredArray);
    }
  };

  function filterArrayByField(value: string): notificationType[] {
    return Notification.filter((item) => item['type'] === value);
  }

  const isActive = label === selectedOption;
  return (
    <View style={isActive ? styles.option : {}}>
      <TouchableOpacity onPress={() => handleOptionPress(label)}>
        <Text style={[styles.text, isActive ? styles.active : {}]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  active: {
    color: COLORS.darkDarkGreen,
  },
  mainContainer: {
    flex: 1,
  },
  navBar: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    display: 'flex',
    flexDirection: 'row',
    height: 59,
    justifyContent: 'space-between',
    paddingLeft: 17,
    paddingRight: 90,
  },
  option: {
    borderBottomColor: COLORS.darkDarkGreen,
    borderBottomWidth: 2,
  },
  text: {
    color: COLORS.lightDarkGreen,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 11,
    marginTop: 11,
  },
});
