import gql from "graphql-tag";
import { client } from "../../apolloconfig";

const SET_MONEY = gql`
  mutation SetNewBalance(
    $money: numeric!
    $uuid: uuid!
    $newBalance: numeric!
  ) {
    __typename
    update_user(
      _set: { balance: $newBalance }
      where: { uuid: { _eq: $uuid } }
    ) {
      affected_rows
      returning {
        balance
        name
        starting_year
        uuid
      }
    }
    insert_deposit(objects: { user: $uuid, amount: $money, type: "" }) {
      affected_rows
    }
  }
`;

export default (req, res) => {
  if (
    req.body.uuid &&
    req.body.amount &&
    req.body.balance &&
    req.method === "POST"
  ) {
    console.log("we have everything");
  }

  client
    .mutate({
      mutation: SET_MONEY,
      variables: {
        money: req.body.amount,
        newBalance: req.body.balance,
        uuid: req.body.uuid
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
