import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { Dispatch, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotificationItem from '../components/NotificationItem';

type notificationType = {
  header: string;
  message: string;
  time: string;
  type: string;
};
const Notification: notificationType[] = [
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
const Notifications = () => {
  const [option, setOption] = useState('All');
  const [notificationArray, setNotificationArray] = useState(Notification);

  return (
    <View style={styles.mainContainer}>
      <Text style={{ display: 'none' }}>Notifications</Text>
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

const colors = ['#ECF7F1', '#6E8E7F', '#073F24'];
const styles = StyleSheet.create({
  active: {
    color: colors[2],
  },
  mainContainer: {
    flex: 1,
  },
  navBar: {
    alignItems: 'center',
    backgroundColor: colors[0],
    display: 'flex',
    flexDirection: 'row',
    height: 59,
    justifyContent: 'space-between',
    paddingLeft: 17,
    paddingRight: 90,
  },
  option: {
    borderBottomColor: colors[2],
    borderBottomWidth: 2,
  },
  text: {
    color: colors[1],
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 11,
    marginTop: 11,
  },
});
