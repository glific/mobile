import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      contact {
        id
        name
        maskedPhone
        lastMessageAt
      }
      messages {
        id
        body
      }
    }
  }
`;

export const GET_CONTACT_MESSAGES = gql`
  query search($filter: SearchFilter!, $contactOpts: Opts!, $messageOpts: Opts!) {
    search(filter: $filter, contactOpts: $contactOpts, messageOpts: $messageOpts) {
      messages {
        id
        body
        flowLabel
        contextMessage {
          body
          contextId
          messageNumber
          errors
          media {
            caption
            sourceUrl
            id
            url
          }
          type
          insertedAt
          location {
            id
            latitude
            longitude
          }
          receiver {
            id
          }
          sender {
            id
            name
          }
        }
        media {
          caption
          url
        }
        insertedAt
        errors
        sender {
          id
        }
        sendBy
        receiver {
          id
        }
        interactiveContent
        location {
          latitude
          longitude
        }
        messageNumber
        type
      }
    }
  }
`;

export const SEND_CONTACT_MESSAGE = gql`
  mutation createAndSendMessage($input: MessageInput!) {
    createAndSendMessage(input: $input) {
      message {
        id
        body
        receiver {
          id
          name
        }
        sender {
          id
          name
        }
      }
      errors {
        key
        message
      }
    }
  }
`;
