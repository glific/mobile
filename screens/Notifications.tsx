import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';
import moment from 'moment';

// import NotificationHeader from '../components/headers/NotificationHeader';
import ErrorAlert from '../components/ui/ErrorAlert';
import NotificationItem from '../components/NotificationItem';
import { COLORS, SCALE, SIZES } from '../constants/theme';
import { GET_NOTIFICATIONS } from '../graphql/queries/Notification';

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

const formatNotifications = (notifications: Notification[]): notificationType[] => {
  return notifications
    .map(({ entity, message, updatedAt, severity }, index) => {
      const { name, phone } = JSON.parse(entity);
      const id = index + 1;
      return {
        id,
        header: name || phone,
        message,
        time: moment.utc(updatedAt).valueOf(),
        type: severity.replace(/"/g, ''),
      };
    })
    .sort((a, b) => b.time - a.time)
    .map(({ time, ...rest }) => ({
      ...rest,
      time: moment.utc(time).fromNow(),
    }));
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
  // const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const [notificationArray, setNotificationArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useQuery(GET_NOTIFICATIONS, {
    onCompleted: (data) => {
      const formattedNotifications = formatNotifications(data.notifications);
      setNotificationArray(formattedNotifications);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setInterval(() => {
        setErrorMessage('');
      }, 4000);
    },
  });

  const handleTabPress = (tab: ITab) => {
    setActiveTab(tab);
  };

  // const handleSearch = (text: string) => {
  //   setSearchValue(text);
  //   // TODO: filter the notification array
  // };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <NotificationHeader searchValue={searchValue} handleSearch={handleSearch} />
  //     ),
  //   });
  // }, [searchValue]);

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
      <FlatList
        data={notificationArray.filter(
          (item) => item['type'] === activeTab.label || activeTab.label === 'All'
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationItem key={item.id} notification={item} />}
        initialNumToRender={10}
      />
      {errorMessage !== '' && <ErrorAlert message={errorMessage} />}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  active: {
    color: COLORS.primary400,
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
    backgroundColor: COLORS.primary10,
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
