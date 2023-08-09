import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';

import ErrorAlert from '../components/ui/ErrorAlert';
import NotificationItem from '../components/NotificationItem';
import { COLORS, SCALE, SIZES } from '../constants/theme';
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT } from '../graphql/queries/Notification';
import { MARK_NOTIFICATIONS_AS_READ } from '../graphql/mutations/Notification';
import Loading from '../components/ui/Loading';

interface Notification {
  entity: string;
  message: string;
  updatedAt: string;
  severity: string;
}

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

type NotificationProps = {
  searchValue: string;
};

const Notifications: React.FC<NotificationProps> = ({ searchValue }) => {
  const client = useApolloClient();
  const [activeTab, setActiveTab] = useState(Tabs[0]);
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

  const {
    loading,
    fetchMore,
    data: notificationData,
  } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      filter: { message: searchValue },
      opts: { limit: 10, offset: 0, order: 'DESC', orderWith: 'updated_at' },
    },
    onCompleted() {
      markNotificationAsRead();
    },
    onError(error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    },
  });

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

  const renderItem = ({ item, index }) => <NotificationItem key={index} {...item} />;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        accessibilityLabel={'notification-list'}
        data={notificationData?.notifications.filter(
          (item: Notification) =>
            item.severity.replace(/"/g, '') === activeTab.label || activeTab.label === 'All'
        )}
        renderItem={renderItem}
        ListEmptyComponent={
          <>{!loading && <Text style={styles.emptyText}>No notification</Text>}</>
        }
        ListHeaderComponent={
          <View style={styles.navBar}>
            {Tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                testID={tab.label}
                onPress={() => setActiveTab(tab)}
                style={tab.label === activeTab.label ? styles.activeTab : styles.inActiveTab}
              >
                <Text style={[styles.tabText, tab.label === activeTab.label ? styles.active : {}]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
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
