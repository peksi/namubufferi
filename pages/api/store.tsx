import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { client } from "../../apolloconfig";

const PRODUCTS = gql`
  query HajeTuotteet {
    __typename
    location {
      id
      name
      visible
      categories {
        id
        location
        name
        products {
          Name
          Price
          uuid
        }
      }
    }
  }
`;

export default (req, res) => {
  client
    .query({ query: PRODUCTS })
    .then(result => {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    })
    .catch(err => console.log(err));
};
