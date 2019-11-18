import { Table, Header, Button, Segment, Grid, Icon } from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";
import AddMoney from "./AddMoney";

export interface UserListRowProps {
  data: {
    name: string;
    starting_year: string;
    uuid: string;
    balance: Number;
  };
}

const UserListRow = (props: UserListRowProps) => {
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
                    {props.data.starting_year} &bull; {props.data.uuid}
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
                  query: { id: props.data.uuid }
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

      {open ? <AddMoney uuid={props.data.uuid} /> : <></>}
    </>
  );
};

export default UserListRow;
