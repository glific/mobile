import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import Storage from '../utils/asyncStorage';

// Fetches the uri dynamically
const customFetch = async (uri, options) => {
  const serverURL = await Storage.getData('serverURL');
  return fetch(serverURL, options);
};

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

const httpLink = new HttpLink({ fetch: customFetch });

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
