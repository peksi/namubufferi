import gql from "graphql-tag";
import { client } from "../../apolloconfig";

const PURCHASE = gql`
  mutation SetNewBalance(
    $sum: numeric!
    $user_uuid: uuid!
    $amount: Int!
    $product_uuid: uuid!
    $newBalance: numeric!
  ) {
    __typename
    update_user(
      _set: { balance: $newBalance }
      where: { uuid: { _eq: $user_uuid } }
    ) {
      affected_rows
      returning {
        balance
        name
        starting_year
        uuid
      }
    }
    insert_transaction(
      objects: {
        user: $user_uuid
        amount: $amount
        product: $product_uuid
        sum: $sum
      }
    ) {
      returning {
        timestamp
        uuid
      }
      affected_rows
    }
  }
`;

export default (req, res) => {
  if (
    req.body.sum &&
    req.body.amount &&
    req.body.newBalance &&
    req.body.user_uuid &&
    req.body.product_uuid &&
    req.method === "POST"
  ) {
    console.log("we have everything");
  }

  client
    .mutate({
      mutation: PURCHASE,
      variables: {
        sum: req.body.sum,
        amount: req.body.amount,
        newBalance: req.body.newBalance,
        user_uuid: req.body.user_uuid,
        product_uuid: req.body.product_uuid
      }
    })
    .then(result => {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 400;
      res.end(JSON.stringify("You're missing some content from the request"));
    });
};
