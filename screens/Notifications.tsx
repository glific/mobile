import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import NotificationItem from '../components/NotificationItem';
import { COLORS, SCALE, SIZES } from '../constants/theme';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../graphql/queries/Notification';
import moment from 'moment';

type notificationType = {
  id: number;
  header: string;
  message: string;
  time: string;
  type: string;
};
interface Notification {
  entity: string;
  message: string;
  updatedAt: string;
  severity: string;
}
let Notification: notificationType[] = [];

const formatNotifications = (notifications: Notification[]): notificationType[] => {
  let id = 0;
  const formattedNotifications: notificationType[] = notifications.map(
    (notification: Notification) => {
      const { entity, message, updatedAt, severity } = notification;
      const { name, phone } = JSON.parse(entity);
      id += 1;
      return {
        id: id,
        header: name || phone,
        message,
        time: updatedAt,
        type: severity.replace(/"/g, ''),
      };
    }
  );

  // Sort the formatted notifications based on time in descending order (recent on first)
  const sortedNotifications = formattedNotifications.sort((a, b) => {
    const timeA = Number(moment.utc(a.time).valueOf());
    const timeB = Number(moment.utc(b.time).valueOf());
    return timeB - timeA;
  });

  return sortedNotifications.map((notification) => {
    const { time, ...rest } = notification;
    return {
      ...rest,
      time: moment.utc(time).fromNow(), // format time into minutes, hrs, days etc.
    };
  });
};
interface ITab {
  id: number;
  label: string;
}

const Tabs: ITab[] = [
  { id: 1, label: 'All' },
  { id: 2, label: 'Critical' },
  { id: 3, label: 'Warning' },
  { id: 4, label: 'Info' },
];

type RenderOptionProps = {
  label: string;
  selectedTab: ITab;
  handlePress: () => void;
};

const RenderOption: React.FC<RenderOptionProps> = ({ label, selectedTab, handlePress }) => {
  const isActive = label === selectedTab.label;
  return (
    <TouchableOpacity
      testID={label}
      onPress={handlePress}
      style={isActive ? styles.activeTab : styles.inActiveTab}
    >
      <Text style={[styles.tabText, isActive ? styles.active : {}]}>{label}</Text>
    </TouchableOpacity>
  );
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const [notificationArray, setNotificationArray] = useState(Notification);

  useQuery(GET_NOTIFICATIONS, {
    onCompleted: (data) => {
      Notification = formatNotifications(data.notifications);
      setNotificationArray(Notification);
    },
  });

  const handleTabPress = (tab: ITab) => {
    setActiveTab(tab);
    if (tab.label === 'All') {
      setNotificationArray(Notification);
    } else {
      const filteredArray = Notification.filter((item) => item['type'] === tab.label);
      setNotificationArray(filteredArray);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.navBar}>
        {Tabs.map((tab) => (
          <RenderOption
            key={tab.id}
            label={tab.label}
            selectedTab={activeTab}
            handlePress={() => handleTabPress(tab)}
          />
        ))}
      </View>
      <ScrollView>
        {notificationArray.map((item) => {
          return <NotificationItem key={item.id} notification={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  active: {
    color: COLORS.primary70,
  },
  activeTab: {
    alignContent: 'center',
    borderBottomColor: COLORS.brightGreen,
    borderBottomWidth: SCALE(2),
    height: SIZES.s60,
    justifyContent: 'center',
    marginHorizontal: SIZES.m16,
  },
  inActiveTab: {
    alignContent: 'center',
    height: SIZES.s60,
    justifyContent: 'center',
    marginHorizontal: SIZES.m16,
  },
  mainContainer: {
    flex: 1,
  },
  navBar: {
    alignItems: 'center',
    borderBottomWidth: SCALE(0.2),
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    height: SIZES.s60,
    paddingLeft: SIZES.m16,
  },
  tabText: {
    color: COLORS.primary70,
    fontSize: SIZES.f14,
    fontWeight: '700',
  },
});
