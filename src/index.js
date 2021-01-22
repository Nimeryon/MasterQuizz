import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
//React Components
import App from './components/App';

const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);