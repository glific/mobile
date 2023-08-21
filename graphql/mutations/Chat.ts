import { gql } from '@apollo/client';

export const SEND_CONTACT_MESSAGE = gql`
  mutation createAndSendMessage($input: MessageInput!) {
    createAndSendMessage(input: $input) {
      message {
        id
        body
        receiver {
          id
        }
        sender {
          id
        }
        media {
          url
          caption
        }
      }
      errors {
        key
        message
      }
    }
  }
`;

export const SEND_COLLECTION_MESSAGE = gql`
  mutation createAndSendMessageToGroup($groupId: ID!, $input: MessageInput!) {
    createAndSendMessageToGroup(groupId: $groupId, input: $input) {
      success
    }
  }
`;

export const CLEAR_MESSAGES = gql`
  mutation clearMessages($contactId: ID!) {
    clearMessages(contactId: $contactId) {
      success
      errors {
        key
        message
      }
    }
  }
`;

export const CONTACT_FRAGMENT = gql`
  fragment isOrgRead on Contact {
    isOrgRead
  }
`;

export const MARK_AS_READ = gql`
  mutation markContactMessagesAsRead($contactId: Gid!) {
    markContactMessagesAsRead(contactId: $contactId)
  }
`;

export const CREATE_MEDIA_MESSAGE = gql`
  mutation createMediaMessage($input: MessageMediaInput!) {
    createMessageMedia(input: $input) {
      messageMedia {
        id
      }
    }
  }
`;

export const UPLOAD_MEDIA_BLOB = gql`
  mutation uploadBlob($media: String!, $extension: String!) {
    uploadBlob(media: $media, extension: $extension)
  }
`;

export const UPLOAD_MEDIA = gql`
  mutation uploadMedia($media: Upload!, $extension: String!) {
    uploadMedia(media: $media, extension: $extension)
  }
`;
