import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import fetch from "isomorphic-fetch";

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: "https://athene-namubufferi.herokuapp.com/v1/graphql",
    headers: {
      "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET
    },
    fetch: fetch
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache"
    }
  }
});
