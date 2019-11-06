import { Table, Header, Button, Segment, Grid, Icon } from "semantic-ui-react";
import UserDescription from "./UserDescription";
import { useState } from "react";
import Link from "next/link";

const UserListRow = props => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={7}>
              <Header as="h4" image>
                <Header.Content>
                  {props.data.name}
                  <Header.Subheader>
                    {props.data.starting_year}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={2} style={{ lineHeight: "36px" }}>
              {props.data.balance}
            </Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={() => setOpen(!open)}>Historia</Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={() => setOpen(!open)}>Saldo</Button>
            </Grid.Column>
            <Grid.Column width={3}>
              <Link
                href={{
                  pathname: "/store",
                  query: { id: props.id }
                }}
              >
                <Button primary icon labelPosition="right">
                  Ostoksille
                  <Icon name="food" />
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      {open ? <UserDescription /> : <></>}
    </>
  );
};

export default UserListRow;
