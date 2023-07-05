import { SAVED_SEARCH_QUERY } from '../../graphql/queries/Search';

export const SAVED_SEARCH_MOCK = [
  {
    request: {
      query: SAVED_SEARCH_QUERY,
      variables: {
        filter: {
          isReversed: true,
        },
        opts: {},
      },
    },
    result: {
      data: {
        savedSearches: [
          {
            id: '1',
            args: '{}',
            shortcode: 'ts',
            label: 'test search',
            isReserved: true,
          },
        ],
      },
    },
  },
];

export const NO_SAVED_SEARCH_MOCK = [
  {
    request: {
      query: SAVED_SEARCH_QUERY,
      variables: {
        filter: {
          isReversed: true,
        },
        opts: {},
      },
    },
    result: {
      data: {
        savedSearches: [],
      },
    },
  },
];
