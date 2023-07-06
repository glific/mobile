import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';

import Storage from '../utils/asyncStorage';
import AxiosService from './axios';

// Fetches the uri dynamically
async function customFetch(uri, options) {
  const serverURL = await Storage.getData('serverURL');
  return fetch(serverURL, options);
}

// Async function to fetch the token
async function fetchToken() {
  const sessionValue = await Storage.getData('session');
  let token = '';
  if (sessionValue !== null) {
    const parsedSessionValue = JSON.parse(sessionValue);
    token = parsedSessionValue.access_token;
  }
  return token;
}

// Create an ApolloLink instance
const authLink = new ApolloLink((operation, forward) => {
  return fetchToken().then((token) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token,
      },
    }));
    return forward(operation);
  });
});

const refreshLink: any = new TokenRefreshLink({
  accessTokenField: 'access_token',
  isTokenValidOrUndefined: async () => {
    const sessionValue = await Storage.getData('session');
    if (sessionValue === null) {
      return false;
    }

    const parsedSessionValue = JSON.parse(sessionValue);
    const tokenExpiryTimeFromSession = parsedSessionValue.token_expiry_time;
    if (!tokenExpiryTimeFromSession) {
      return false;
    }
    const tokenExpiryTime = new Date(tokenExpiryTimeFromSession);
    return tokenExpiryTime > new Date();
  },
  fetchAccessToken: async () => {
    const sessionValue = await Storage.getData('session');
    if (sessionValue === null) {
      console.log('No session value');
      return new Error('No session value');
    }

    const parsedSessionValue = await JSON.parse(sessionValue);
    const renewalToken = parsedSessionValue.renewal_token;

    const Client = await AxiosService.createAxiosInstance();
    return Client.post('/v1/session/renew', null, {
      headers: {
        Authorization: renewalToken,
      },
    });
  },
  handleResponse: (_operation, accessTokenField) => async (response: any) => {
    const tokenResponse: any = [];

    if (response.data) {
      await Storage.storeData('session', JSON.stringify(response.data.data));
      tokenResponse[accessTokenField] = response.data.data.access_token;
    }
    return tokenResponse;
  },
  handleError: (err: Error) => {
    console.log('Refresh link error: ', err);
  },
});

const httpLink = new HttpLink({ fetch: customFetch });

export const client = new ApolloClient({
  link: ApolloLink.from([refreshLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
