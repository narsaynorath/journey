import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/core';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { onError } from '@apollo/link-error';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';

import { endpoint, prodEndpoint } from '../config';

const everbaseLink = new HttpLink({
  uri: 'https://api.everbase.co/graphql', // TODO: Add API Key
});

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === 'everbase',
      everbaseLink,
      ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            );
          if (networkError)
            console.log(
              `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
            );
        }),
        // this uses apollo-link-http under the hood, so all the options here come from that package
        createUploadLink({
          uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
          fetchOptions: {
            credentials: 'include',
          },
          // pass the headers along from this request. This enables SSR with logged in state
          headers,
        }),
      ])
    ),
    cache: new InMemoryCache({}).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });
