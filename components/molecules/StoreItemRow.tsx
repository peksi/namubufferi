import { Header, Segment, Grid, Button } from "semantic-ui-react";
import { useState } from "react";

const StoreItemRow = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Segment attached>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Header as="h4" image>
                <Header.Content>
                  Coca Cola
                  <Header.Subheader>Uuden ajan tärpättiä</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={3}>1.00 €</Grid.Column>
            <Grid.Column width={7}>
              <div>
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
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      {open ? (
        <Segment attached secondary>
          Buy custom amounts here
        </Segment>
      ) : (
        <></>
      )}
    </>
  );
};

export default StoreItemRow;
