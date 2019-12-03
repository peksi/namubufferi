import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import fetch from "isomorphic-fetch";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

console.log(serverRuntimeConfig.hasura_key);
console.log(publicRuntimeConfig.api_url);

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: "https://athene-namubufferi.herokuapp.com/v1/graphql",
    headers: {
      "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET
    },
    fetch: fetch
  }),

  cache: new InMemoryCache()
});
