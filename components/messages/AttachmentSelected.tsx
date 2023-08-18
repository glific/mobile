import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, SIZES, Icon } from '../../constants';

interface Props {
  name: string;
  type: string;
  remove: () => void;
}

const AttachmentSelected = ({ name, type, remove }: Props) => {
  let icon;
  switch (type) {
    case 'image':
      icon = <Icon testID="image" name="image" style={styles.attachmentIcon} />;
      break;
    case 'document':
      icon = <Icon testID="document" name="file-document" style={styles.attachmentIcon} />;
      break;
    case 'video':
      icon = <Icon testID="video" name="folder-video" style={styles.attachmentIcon} />;
      break;
    case 'audio':
      icon = <Icon testID="audio" name="headphone" style={styles.attachmentIcon} />;
      break;
    case 'recording':
      icon = <Icon testID="recording" name="microphone" style={styles.attachmentIcon} />;
      break;
  }
  return (
    <View testID="selectedAttachmentTab" style={styles.attachment}>
      <View style={styles.flexView}>
        {icon}
        <Text testID="attachmentURL" style={styles.attachmentText}>
          {name.slice(0, 30)}
        </Text>
      </View>
      <Icon testID="removeAttachment" name="cross" style={styles.clearIcon} onPress={remove} />
    </View>
  );
};

export default AttachmentSelected;

const styles = StyleSheet.create({
  attachment: {
    alignItems: 'center',
    backgroundColor: COLORS.primary10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.m10,
  },
  attachmentIcon: {
    color: COLORS.primary400,
    fontSize: SIZES.m24,
  },
  attachmentText: {
    color: COLORS.primary70,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginLeft: SIZES.m10,
  },
  clearIcon: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    marginRight: SIZES.m10,
  },
  flexView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
