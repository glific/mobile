import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import * as DocumentPicker from 'expo-document-picker';

import Input from '../ui/Input';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import { showToast } from '../../utils/showToast';
import { UPLOAD_MEDIA } from '../../graphql/mutations/Chat';
import { COLORS, SCALE, SIZES, Icon } from '../../constants';
import { GET_ATTACHMENT_PERMISSION } from '../../graphql/queries/Account';

type MediaType = {
  name: string;
  url: string;
  type: string;
};

interface AttachmentPopupProps {
  visible: boolean;
  onClose: () => void;
  mediaType: string;
  // eslint-disable-next-line no-unused-vars
  setMedia: (media: MediaType) => void;
}

const fileType = {
  image: 'image/*',
  document: '*/*',
  video: 'video/*',
  audio: 'audio/*',
};

const AttachmentPopup: React.FC<AttachmentPopupProps> = ({
  visible,
  onClose,
  mediaType,
  setMedia,
}) => {
  const [file, setFile] = useState<DocumentPicker.DocumentResult | null>(null);
  const [attachmentURL, setAttachmentURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadPermission, setUploadPermission] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  useQuery(GET_ATTACHMENT_PERMISSION, {
    onCompleted(data) {
      if (!data.attachmentsEnabled) {
        setUploadPermission(false);
        setErrorMessage('Please integrate Google Cloud Storage to use the upload');
      }
    },
  });

  const [uploadMedia] = useMutation(UPLOAD_MEDIA, {
    onCompleted: (data) => {
      setAttachmentURL(data.uploadMedia);
      setUploading(false);
      showToast('File uploaded successfully!');
    },
    onError: (error) => {
      setFileName('');
      setUploading(false);
      showToast('Failed to upload file');
      console.log(error);
    },
  });

  const handleSelect = async () => {
    setErrorMessage('');
    try {
      setAttachmentURL('');
      const result = await DocumentPicker.getDocumentAsync({
        type: fileType[mediaType],
      });
      if (result.type === 'success') {
        setFile(result);
        const mediaName = result.name;
        const extension = mediaName.slice(
          (Math.max(0, mediaName.lastIndexOf('.')) || Infinity) + 1
        );
        const shortenedName =
          (mediaName.length > 15 ? `${mediaName.slice(0, 10)}...` : mediaName) + '.' + extension;
        setFileName(shortenedName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    const extension = fileName.split('.').pop();
    uploadMedia({
      variables: {
        media: file,
        extension,
      },
    });
  };

  const handleAdd = () => {
    setFile(null);
    setMedia({
      name: fileName,
      url: attachmentURL,
      type: mediaType.toUpperCase(),
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.background}>
        <View testID="AttachmentPopup" style={styles.popupContainer}>
          <Text testID="popupTitle" style={styles.title}>
            Add {mediaType} to message
          </Text>
          <View>
            <Input
              testID="attachmentUrl"
              placeholder="Attachment url"
              value={attachmentURL}
              onUpdateValue={(test) => {
                setFile(null);
                setAttachmentURL(test);
              }}
              type="text"
            />
            <View style={styles.selectContainer}>
              <Pressable
                testID="selectFile"
                disabled={!uploadPermission}
                style={styles.selectButton}
                onPress={handleSelect}
              >
                {file ? (
                  <Text style={styles.uploadText}>{fileName}</Text>
                ) : (
                  <>
                    <Icon name="upload" style={styles.selectIcon} />
                    <Text style={styles.uploadText}>Upload File</Text>
                  </>
                )}
              </Pressable>
              {file && attachmentURL == '' && (
                <Pressable
                  testID="uploadButton"
                  disabled={uploading}
                  style={styles.uploadButton}
                  onPress={handleUpload}
                >
                  {uploading ? (
                    <Loading size="small" color={COLORS.white} />
                  ) : (
                    <Icon name="upload" style={styles.uploadIcon} />
                  )}
                </Pressable>
              )}
            </View>
            {errorMessage && <Text style={styles.errorLabel}>{errorMessage}</Text>}
          </View>

          <View style={styles.buttonContainer}>
            <View testID="cancelButton" style={styles.button}>
              <Button type="neutral" onPress={onClose}>
                <Text>CANCEL</Text>
              </Button>
            </View>
            <View testID="yesButton" style={styles.button}>
              <Button disable={attachmentURL === ''} type="positive" onPress={handleAdd}>
                <Text>ADD</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AttachmentPopup;

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: COLORS.black08,
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: SIZES.s36,
    marginLeft: SIZES.m10,
    width: SCALE(100),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SIZES.m24,
  },
  errorLabel: {
    color: COLORS.error100,
    fontSize: SIZES.f14,
    marginTop: SIZES.m4,
  },
  popupContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r10,
    paddingHorizontal: SIZES.m16,
    paddingVertical: SIZES.m20,
    rowGap: SIZES.m16,
    width: SIZES.s328,
  },
  selectButton: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary70,
    borderRadius: SIZES.s30,
    borderWidth: SCALE(0.75),
    flexDirection: 'row',
    height: SIZES.s36,
    justifyContent: 'center',
    marginTop: SIZES.m6,
    paddingHorizontal: SIZES.m10,
    width: SCALE(150),
  },
  selectContainer: {
    flexDirection: 'row',
  },
  selectIcon: {
    color: COLORS.primary70,
    fontSize: SIZES.f14,
  },
  title: {
    color: COLORS.primary400,
    fontSize: SIZES.f18,
    fontWeight: '600',
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary100,
    borderRadius: SIZES.s30,
    flexDirection: 'row',
    height: SIZES.s36,
    justifyContent: 'center',
    marginLeft: SIZES.m10,
    marginTop: SIZES.m6,
    paddingHorizontal: SIZES.m10,
    width: SIZES.s36,
  },
  uploadIcon: {
    color: COLORS.white,
    fontSize: SIZES.f14,
  },
  uploadText: {
    color: COLORS.primary70,
    fontSize: SIZES.f14,
    includeFontPadding: false,
    marginLeft: SIZES.m4,
  },
});
