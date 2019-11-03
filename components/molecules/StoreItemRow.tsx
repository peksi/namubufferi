import {
  Header,
  Segment,
  Grid,
  Button,
  Input,
  Select
} from "semantic-ui-react";
import { useState } from "react";

const StoreItemRow = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [price] = useState(1.23);
  return (
    <>
      <Segment attached>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header as="h4" image>
                <Header.Content>
                  Coca Cola
                  <Header.Subheader>Uuden ajan tärpättiä</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button.Group>
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
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
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
