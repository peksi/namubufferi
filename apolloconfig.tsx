import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const client = new ApolloClient({
  uri: "https://athene-namubufferi.herokuapp.com/v1/graphql",
  headers: {
    "X-Hasura-Admin-Secret": serverRuntimeConfig.HASURA_ADMIN_SECRET
  },
  fetch
});
