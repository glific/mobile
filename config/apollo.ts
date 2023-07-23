import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, Operation } from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setContext } from '@apollo/link-context';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { RetryLink } from '@apollo/client/link/retry';
import { hasSubscription } from '@jumpn/utils-graphql';

import Storage from '../utils/asyncStorage';
import AxiosService from './axios';

// Fetches the uri dynamically
async function customFetch(uri: string, options: RequestInit) {
  const orgValue = await Storage.getData('glific_organisation');
  if (orgValue !== null) {
    const parsedOrgValue = JSON.parse(orgValue);
    return await fetch(parsedOrgValue.url, options);
  }
}
const getWsUrl = async (): Promise<string> => {
  const orgValue = await Storage.getData('glific_organisation');
  if (orgValue !== null) {
    const parsedOrgValue = JSON.parse(orgValue);
    return parsedOrgValue.wsUrl;
  }
  return '';
};

// Async function to fetch the token
async function fetchToken(): Promise<string> {
  const sessionValue = await Storage.getData('glific_session');
  let token = '';
  if (sessionValue !== null) {
    const parsedSessionValue = JSON.parse(sessionValue);
    token = parsedSessionValue.access_token;
  }
  return token;
}

const refreshLink = new TokenRefreshLink({
  accessTokenField: 'access_token',
  isTokenValidOrUndefined: async () => {
    const sessionValue = await Storage.getData('glific_session');
    if (sessionValue === null) return false;

    const parsedSessionValue = JSON.parse(sessionValue);
    const tokenExpiryTimeFromSession = parsedSessionValue.token_expiry_time;
    if (!tokenExpiryTimeFromSession) return false;

    const tokenExpiryTime = new Date(tokenExpiryTimeFromSession);
    const isValidToken = tokenExpiryTime > new Date();
    return isValidToken;
  },
  fetchAccessToken: async () => {
    const sessionValue = await Storage.getData('glific_session');
    if (!sessionValue) return null;

    const parsedSessionValue = await JSON.parse(sessionValue);
    const renewalToken = parsedSessionValue.renewal_token;

    const Client = await AxiosService.createAxiosInstance();
    const response = await Client.post('/v1/session/renew', null, {
      headers: {
        Authorization: renewalToken,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    return null;
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleFetch: () => {},
  handleResponse:
    <T>(_operation: Operation<T>, accessTokenField: string) =>
    async (response: Response<T>): Promise<T | unknown> => {
      const tokenResponse: unknown = [];

      if (response) {
        await Storage.storeData('glific_session', JSON.stringify(response.data));
        tokenResponse[accessTokenField] = response.data.access_token;
      }
      return tokenResponse;
    },
  handleError: (err: Error) => {
    console.log('Refresh error: ', err);
  },
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        contactHistory: {
          keyArgs: false,

          merge(existing, incoming, { args }: any) {
            if (args.opts.offset === 0) {
              return incoming;
            }
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const retryIf = (error: any) => {
  const doNotRetryCodes = [500, 400, 401];
  return !!error && !doNotRetryCodes.includes(error.statusCode);
};

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf,
  },
});

// Create an ApolloLink instance
const authLink = setContext(async (_, { headers }) => {
  const accessToken = await fetchToken();
  return {
    headers: {
      ...headers,
      authorization: accessToken || '',
    },
  };
});

const httpLink = new HttpLink({ fetch: customFetch });

const wsLink = new GraphQLWsLink(
  createClient({
    url: getWsUrl,
    connectionParams: {
      authToken: fetchToken(),
    },
  })
);

const link = retryLink.split(
  (operation) => hasSubscription(operation.query),
  wsLink,
  ApolloLink.from([refreshLink, authLink, httpLink])
);

export const client = new ApolloClient({
  link: link,
  cache: cache,
});
