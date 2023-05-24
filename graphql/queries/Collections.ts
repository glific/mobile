import { gql } from '@apollo/client';

export const GET_COLLECTIONS = gql`
{
    filter: { searchGroup: true},
    messageOpts: {
      limit: 3,
      offset: 0,
    },
    contactOpts: {
      limit: 10,
      offset: 0,
    },
  }
  `;