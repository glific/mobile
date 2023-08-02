import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import moment from 'moment';

import ErrorAlert from '../components/ui/ErrorAlert';
import NotificationItem from '../components/NotificationItem';
import { COLORS, SCALE, SIZES } from '../constants/theme';
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT } from '../graphql/queries/Notification';
import { MARK_NOTIFICATIONS_AS_READ } from '../graphql/mutations/Notification';
import Loading from '../components/ui/Loading';

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

type NotificationProps = {
  searchValue: string;
};

const Notifications: React.FC<NotificationProps> = ({ searchValue }) => {
  const client = useApolloClient();
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const [notificationArray, setNotificationArray] = useState<notificationType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const [markNotificationAsRead] = useMutation(MARK_NOTIFICATIONS_AS_READ, {
    onCompleted: (data) => {
      if (data.markNotificationAsRead) {
        client.writeQuery({
          query: GET_NOTIFICATIONS_COUNT,
          variables: {
            filter: {
              is_read: false,
            },
          },
          data: { countNotifications: 0 },
        });
      }
    },
  });

  const { loading, fetchMore } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      filter: { message: searchValue },
      opts: { limit: 10, offset: 0, order: 'DESC', orderWith: 'updated_at' },
    },
    onCompleted(data) {
      markNotificationAsRead();
      const formattedNotifications = formatNotifications(data.notifications);
      setNotificationArray(formattedNotifications);
    },
    onError(error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    },
  });

  const handleTabPress = (tab: ITab) => {
    setActiveTab(tab);
  };

  const handleLoadMore = () => {
    if (loading || noMoreItems) return;

    fetchMore({
      variables: {
        filter: { message: searchValue },
        opts: { limit: 10, offset: pageNo * 10, order: 'DESC', orderWith: 'updated_at' },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.notifications?.length) {
          setNoMoreItems(true);
          return prev;
        } else {
          if (fetchMoreResult.notifications.length < 10) setNoMoreItems(true);
          setPageNo(pageNo + 1);
          return {
            notifications: [...prev.notifications, ...fetchMoreResult.notifications],
          };
        }
      },
    });
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        accessibilityLabel={'notification-list'}
        data={notificationArray.filter(
          (item) => item['type'] === activeTab.label || activeTab.label === 'All'
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationItem key={item.id} {...item} />}
        ListEmptyComponent={
          <>{!loading && <Text style={styles.emptyText}>No notification</Text>}</>
        }
        ListHeaderComponent={
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
        }
        initialNumToRender={10}
        style={styles.innerContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {loading && <Loading />}
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
    borderBottomColor: COLORS.primary400,
    borderBottomWidth: SCALE(2),
    height: SIZES.s60,
    justifyContent: 'center',
    marginHorizontal: SIZES.m16,
  },
  emptyText: {
    alignSelf: 'center',
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginTop: SIZES.m16,
  },
  inActiveTab: {
    alignContent: 'center',
    height: SIZES.s60,
    justifyContent: 'center',
    marginHorizontal: SIZES.m16,
  },
  innerContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
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
