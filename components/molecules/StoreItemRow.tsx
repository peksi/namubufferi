import {
  Header,
  Segment,
  Grid,
  Button,
  Input,
  Select,
  Message,
  Icon
} from "semantic-ui-react";
import { useState } from "react";
import { useStoreState } from "../../store";
import useFetch from "use-http";
import Router from "next/router";

interface Props {
  product: {
    Name: string;
    Price: number;
    uuid: string;
  };
}

const StoreItemRow = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const currentUser = useStoreState(state => state.currentUser.currentUser);
  const price = props.product.Price;
  const [request, response] = useFetch("/api");

  if (response.ok) {
    setTimeout(() => {
      Router.push("/");
    }, 3000);
  }

  return (
    <>
      <Segment attached>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header as="h4" image>
                <Header.Content>
                  {props.product.Name}
                  {/* <Header.Subheader>Uuden ajan tärpättiä</Header.Subheader> */}
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button.Group style={{ userSelect: "none" }}>
                <Button
                  primary
                  onClick={() => (amount > 0 ? setAmount(amount - 1) : null)}
                >
                  -
                </Button>
                <div className="ui button" onClick={() => setAmount(1)}>
                  {amount}
                </div>
                <Button primary onClick={() => setAmount(amount + 1)}>
                  +
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column
              width={5}
              style={{
                display: "flex",
                justifyContent: "center",
                lineHeight: "36px"
              }}
            >
              {amount <= 1
                ? price + "€"
                : amount +
                  " * " +
                  price +
                  " € = " +
                  (price * amount).toFixed(2) +
                  " €"}
            </Grid.Column>
            <Grid.Column
              width={4}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                icon="ellipsis horizontal"
                onClick={() => setOpen(!open)}
              />
              <Button
                content="Osta"
                icon="shopping cart"
                labelPosition="right"
                primary
                onClick={() => {
                  request.post("/purchase", {
                    sum: price * amount,
                    amount: amount,
                    newBalance: currentUser.balance - price * amount,
                    user_uuid: currentUser.uuid,
                    product_uuid: props.product.uuid
                  });
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      {response.ok || request.loading ? (
        <Message
          icon
          positive={!request.loading}
          negative={!(typeof request.error === "undefined")}
        >
          {request.loading ? (
            <Icon name="circle notched" loading />
          ) : (
            <Icon name="check square" />
          )}
          <Message.Header>
            {request.error ? request.error.message : <></>}
            {response.data ? (
              "Ostos onnistui! Rahaa jäljellä " +
              response.data.data.update_user.returning[0].balance +
              "€ käyttäjällä " +
              response.data.data.update_user.returning[0].name
            ) : (
              <></>
            )}
          </Message.Header>
        </Message>
      ) : (
        <></>
      )}
      {open ? (
        <Segment attached secondary>
          Ilmoita namusetädille että on loppu
        </Segment>
      ) : (
        <></>
      )}
    </>
  );
};

export default StoreItemRow;
