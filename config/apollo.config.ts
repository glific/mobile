import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { API_BASE_URL } from "@env"
var API_BASE_URL = "https://api.staging.tides.coloredcow.com/api"

export const client = new ApolloClient({
  uri: API_BASE_URL,
  cache: new InMemoryCache(),
});

