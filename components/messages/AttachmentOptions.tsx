import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Foundation, Ionicons } from '@expo/vector-icons';

import { COLORS, SCALE, SIZES } from '../../constants';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleAttachment: (attachment: string) => void;
}

const AttachmentOptions = ({ handleAttachment }: Props) => {
  return (
    <View testID="attachmentsTab" style={styles.attachmentsContainer}>
      <View style={styles.attachmentInContainer}>
        <View style={styles.attachmentButton}>
          <Pressable
            style={styles.attachmentButton}
            onPress={() => handleAttachment('image')}
            android_ripple={{ borderless: false }}
          >
            <Ionicons name="image-outline" style={styles.attachmentIcon} />
          </Pressable>
        </View>
        <View style={styles.attachmentButton}>
          <Pressable
            style={styles.attachmentButton}
            onPress={() => handleAttachment('document')}
            android_ripple={{ borderless: false }}
          >
            <Ionicons name="document-attach-outline" style={styles.attachmentIcon} />
          </Pressable>
        </View>
        <View style={styles.attachmentButton}>
          <Pressable
            style={styles.attachmentButton}
            onPress={() => handleAttachment('location')}
            android_ripple={{ borderless: false }}
          >
            <Ionicons name="location-outline" style={styles.attachmentIcon} />
          </Pressable>
        </View>
      </View>
      <View style={styles.attachmentInContainer}>
        <View style={styles.attachmentButton}>
          <Pressable
            style={styles.attachmentButton}
            onPress={() => handleAttachment('video')}
            android_ripple={{ borderless: false }}
          >
            <Ionicons name="videocam-outline" style={styles.attachmentIcon} />
          </Pressable>
        </View>
        <View style={styles.attachmentButton}>
          <Pressable
            style={styles.attachmentButton}
            onPress={() => handleAttachment('audio')}
            android_ripple={{ borderless: false }}
          >
            <Foundation name="sound" style={styles.attachmentIcon} />
          </Pressable>
        </View>
        <View style={styles.attachmentButton}>
          <Pressable
            style={styles.attachmentButton}
            onPress={() => handleAttachment('recording')}
            android_ripple={{ borderless: false }}
          >
            <Ionicons name="mic-outline" style={styles.attachmentIcon} />
          </Pressable>
        </View>
      </View>
    </View>
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
    color: COLORS.primary400,
    fontSize: SIZES.m24,
  },
  attachmentInContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attachmentsContainer: {
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.black005,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.5),
    bottom: SIZES.s60,
    elevation: 3,
    gap: SIZES.m6,
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
});
