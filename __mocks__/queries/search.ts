import { SAVED_SEARCH_QUERY, SEARCHES_COUNT } from '../../graphql/queries/Search';

const collectionStats = {
  request: {
    query: SEARCHES_COUNT,
    variables: { organizationId: '1' },
  },
  result: {
    data: {
      collectionStats: true,
    },
  },
};

const reservedSavedSearchQuery = {
  request: {
    query: SAVED_SEARCH_QUERY,
    variables: {
      filter: { isReserved: true },
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
};

export const SAVED_SEARCH_MOCK = [
  collectionStats,
  reservedSavedSearchQuery,
  {
    request: {
      query: SAVED_SEARCH_QUERY,
      variables: {
        filter: { isReserved: false },
        opts: { limit: 20 },
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
  collectionStats,
  reservedSavedSearchQuery,
  {
    request: {
      query: SAVED_SEARCH_QUERY,
      variables: {
        filter: { isReserved: false },
        opts: { limit: 20 },
      },
    },
    result: {
      data: {
        savedSearches: [],
      },
    },
  },
];
