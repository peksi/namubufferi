import gql from "graphql-tag";
import { client } from "../../apolloconfig";

const USERS = gql`
  query Users {
    __typename
    user {
      name
      starting_year
      balance
      uuid
      transactions(order_by: { timestamp: asc }, limit: 5) {
        product
        amount
        sum
        timestamp
      }
    }
  }
`;

export default (req, res) => {
  client
    .query({ query: USERS })
    .then(result => {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    })
    .catch(err => console.log(err));
};
