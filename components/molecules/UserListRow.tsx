import { Table, Header, Button, Segment, Grid, Icon } from "semantic-ui-react";
import UserDescription from "./UserDescription";
import { useState } from "react";

const UserListRow = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              <Header as="h4" image>
                <Header.Content>
                  Pekka Lammi
                  <Header.Subheader>IV14</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={2}>22.22 €</Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={() => setOpen(!open)}>Saldo</Button>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button primary icon labelPosition="right">
                Ostoksille
                <Icon name="food" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      {open ? <UserDescription /> : <></>}
    </>
  );
};

export default UserListRow;
