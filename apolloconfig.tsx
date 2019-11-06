import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

export const client = new ApolloClient({
  uri: "https://athene-namubufferi.herokuapp.com/v1/graphql",
  headers: {
    "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET
  },
  fetch
});
