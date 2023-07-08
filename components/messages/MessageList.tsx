import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_MESSAGES } from '../../graphql/queries/Chat';
import { COLORS, SIZES } from '../../constants';
import LoadingPage from '../ui/Loading';
import Message from './Message';

type MessageListProps = {
  id: number;
  conversationType: string;
};

const MessagesList: React.FC<MessageListProps> = ({ conversationType, id }) => {
  const scrollView = useRef<ScrollView>(null);
  const [openVideo, setOpenVideo] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const variables = {
    filter: { id: id, searchGroup: conversationType === 'collection' },
    contactOpts: { limit: 1 },
    messageOpts: { limit: 20 },
  };

  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <LoadingPage />;
  }

  let dataArray = [];
  if (data && data.search && data.search[0] && data.search[0].messages) {
    dataArray = [...data.search[0].messages].reverse();
  }

  const handleVideo = () => {
    setOpenVideo(!openVideo);
  };

  const handleImage = () => {
    setOpenImage(!openImage);
  };

  return (
    <ScrollView
      style={styles.container}
      ref={scrollView}
      onContentSizeChange={() => {
        scrollView.current?.scrollToEnd({ animated: true });
      }}
    >
      {dataArray.length ? (
        dataArray.map((message, index) => (
          <Message
            key={index}
            message={message}
            isLeft={conversationType === 'collection' ? false : message?.sender?.id === id}
            handleImage={handleImage}
            handleVideo={handleVideo}
            openImage={openImage}
            openVideo={openVideo}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>No messages</Text>
      )}
    </ScrollView>
  );
};

export default MessagesList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginBottom: SIZES.m65,
  },
  emptyText: {
    alignSelf: 'center',
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginTop: SIZES.m16,
  },
});
