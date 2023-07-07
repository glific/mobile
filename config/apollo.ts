import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setContext } from '@apollo/link-context';
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
const authLink = setContext(async (_, { headers }) => {
  // get auth token
  const accessToken = await fetchToken();

  return {
    headers: {
      ...headers,
      authorization: accessToken || '',
    },
  };
});

const refreshLink = new TokenRefreshLink({
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
    tokenExpiryTime.setMinutes(tokenExpiryTime.getMinutes() - 29);
    tokenExpiryTime.setSeconds(tokenExpiryTime.getSeconds() - 50);
    return tokenExpiryTime > new Date();
  },
  fetchAccessToken: async () => {
    const sessionValue = await Storage.getData('session');
    const parsedSessionValue = await JSON.parse(sessionValue);
    const renewalToken = parsedSessionValue.renewal_token;

    const Client = await AxiosService.createAxiosInstance();
    return Client.post('/v1/session/renew', null, {
      headers: {
        Authorization: renewalToken,
      },
    })
      .then((response) => response)
      .catch((err) => console.log('axios error', err));
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleFetch: () => {},
  handleResponse: (_operation, accessTokenField) => async (response: any) => {
    const tokenResponse: any = [];
    console.log(response);

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
