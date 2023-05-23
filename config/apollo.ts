import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { API_BASE_URL } from '@env';
import Storage from '../utils/asyncStorage';

const httpLink = new HttpLink({ uri: API_BASE_URL });

// Create an ApolloLink instance
const authLink = new ApolloLink((operation, forward) => {
  // Asynchronously fetch the token
  return fetchToken().then((token) => {
    // Set the token in the request headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token,
      },
    }));

    // Proceed with the request chain
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
  // Simulate an asynchronous API call to retrieve the token

  return token;
}

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
