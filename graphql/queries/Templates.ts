import { gql } from '@apollo/client';

export const GET_TEMPLATES = gql`
  query sessionTemplates($filter: SessionTemplateFilter!, $opts: Opts!) {
    sessionTemplates(filter: $filter, opts: $opts) {
      id
      body
      label
      isHsm
      updatedAt
      translations
      type
      language {
        id
        label
      }
      bspId
      shortcode
      status
      reason
      isReserved
      isActive
      numberParameters
      MessageMedia {
        id
        caption
        sourceUrl
      }
    }
  }
`;

export const GET_INTERACTIVE_MESSAGES = gql`
  query interactiveTemplates($filter: InteractiveTemplateFilter!, $opts: Opts!) {
    interactiveTemplates(filter: $filter, opts: $opts) {
      id
      label
      interactiveContent
      type
      translations
      sendWithTitle
      language {
        id
        label
      }
    }
  }
`;
