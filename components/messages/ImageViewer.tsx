import React from 'react';
import { StyleSheet, View, Text, Modal, Image } from 'react-native';
import moment from 'moment';

import { COLORS, SCALE, SIZES, Icon } from '../../constants';

type ImageViewerProps = {
  message: object;
  handleImage: () => void;
  openImage: boolean;
};

const ImageViewer: React.FC<ImageViewerProps> = ({ message, handleImage, openImage }) => {
  return (
    <Modal transparent visible={openImage} animationType={'fade'}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon
            testID="backButton"
            name="arrow-left"
            style={styles.backButton}
            onPress={handleImage}
          />
          <Text style={styles.headerText}>
            {moment(message.insertedAt).format('DD MMM, hh:mm A')}
          </Text>
        </View>
        <View style={styles.imageViewer}>
          <Image source={{ uri: message.media.url }} style={styles.image} />
        </View>
      </View>
    </Modal>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: SCALE(22),
    paddingHorizontal: SIZES.m10,
  },
  container: {
    backgroundColor: COLORS.black,
    flex: 1,
    height: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.black02,
    flexDirection: 'row',
    height: SIZES.s60,
    paddingHorizontal: SIZES.m16,
    width: SIZES.width,
  },
  headerText: {
    color: COLORS.white,
    fontSize: SIZES.f14,
  },
  image: {
    aspectRatio: 1,
    height: '50%',
    width: '90%',
  },
  imageViewer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
