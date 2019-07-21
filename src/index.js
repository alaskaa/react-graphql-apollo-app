import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import "./style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const GITHUB_BASE_URL = "https://api.github.com/graphql";

// uri defines the only GraphQL API endpoint used by the Apollo Client
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`
  }
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
