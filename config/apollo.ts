import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, Operation } from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setContext } from '@apollo/link-context';

import Storage from '../utils/asyncStorage';
import AxiosService from './axios';

// Fetches the uri dynamically
async function customFetch(uri: string, options: RequestInit) {
  const serverURL = await Storage.getData('serverURL');
  return await fetch(serverURL, options);
}

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
    const sessionValue = await Storage.getData('session');
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
    async (response: Response<T>): Promise<T | any> => {
      const tokenResponse: any = [];

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

export const client = new ApolloClient({
  link: ApolloLink.from([refreshLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
