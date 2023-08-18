import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { COLORS, Icon, SCALE, SIZES } from '../../constants';
import AttachmentPopup from './AttachmentPopup';

type MediaType = {
  name: string;
  url: string;
  type: string;
};

type AttachmentPopup = {
  testID: string;
  name: string;
  icon: string;
};

const attachmentsType = [
  {
    testID: 'attachImage',
    name: 'image',
    icon: 'image',
  },
  {
    testID: 'attachDocument',
    name: 'document',
    icon: 'file-document',
  },
  {
    testID: 'attachVideo',
    name: 'video',
    icon: 'folder-video',
  },
  {
    testID: 'attachAudio',
    name: 'audio',
    icon: 'headphone',
  },
  {
    testID: 'attachRecording',
    name: 'recording',
    icon: 'microphone',
  },
];

interface Props {
  // eslint-disable-next-line no-unused-vars
  setMedia: (media: MediaType) => void;
  onClose: () => void;
}

const AttachmentOptions = ({ setMedia, onClose }: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [attachmentType, setAttachmentType] = useState('');

  const closePopup = () => {
    setShowPopup(false);
    setAttachmentType('');
    onClose();
  };

  const handleAttachment = (attachment: string) => {
    setAttachmentType(attachment);
    setShowPopup(true);
  };

  const renderItem = ({ item }: { item: AttachmentPopup }) => (
    <View key={item.name} style={[styles.attachmentButton, { marginRight: SIZES.m6 }]}>
      <Pressable
        testID="attachImage"
        style={styles.attachmentButton}
        onPress={() => handleAttachment(item.name)}
        android_ripple={{ borderless: false }}
      >
        <Icon name={item.icon} style={styles.attachmentIcon} />
      </Pressable>
    </View>
  );

  return (
    <>
      <View testID="attachmentsTab" style={styles.attachmentsContainer}>
        <FlatList
          data={attachmentsType}
          renderItem={renderItem}
          numColumns={3}
          style={styles.attachmentInContainer}
          contentContainerStyle={styles.attachmentsListContainer}
        />
      </View>
      <AttachmentPopup
        visible={showPopup}
        onClose={closePopup}
        mediaType={attachmentType}
        setMedia={setMedia}
      />
    </>
  );
};

export default AttachmentOptions;

const styles = StyleSheet.create({
  attachmentButton: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary50,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.5),
    height: SIZES.s70,
    justifyContent: 'center',
    overflow: 'hidden',
    width: SCALE(104),
  },
  attachmentIcon: {
    color: COLORS.primary100,
    fontSize: SIZES.m24,
  },
  attachmentInContainer: {
    flex: 1,
  },
  attachmentsContainer: {
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.black005,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.5),
    bottom: SIZES.s60,
    elevation: 3,
    marginBottom: SIZES.m16,
    marginHorizontal: SIZES.m10,
    padding: SIZES.m6,
    position: 'absolute',
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: SCALE(340),
  },
  attachmentsListContainer: {
    rowGap: SIZES.m6,
  },
});
