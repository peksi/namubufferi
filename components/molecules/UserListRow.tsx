import { Table, Header, Button, Segment, Grid, Icon } from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";
import AddMoney from "./AddMoney";

export interface UserListRowProps {
  data: {
    name: string;
    starting_year: string;
    uuid: string;
    balance: number;
  };
  refresh: Function;
}

const UserListRow = (props: UserListRowProps) => {
  const [openHistory, setOpenHistory] = useState(false);
  const [openSaldo, setOpenSaldo] = useState(false);

  const closingTrigger = () => {
    setTimeout(() => {
      // setOpenSaldo(false);
      props.refresh(); // polls all users again to show new saldos
    }, 2000);
  };

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
              {props.data.balance.toFixed(2)} €
            </Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={() => setOpenHistory(!openHistory)}>
                Historia
              </Button>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button onClick={() => setOpenSaldo(!openSaldo)}>Saldo</Button>
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

      {openSaldo ? (
        <AddMoney
          uuid={props.data.uuid}
          balance={props.data.balance}
          closingTrigger={closingTrigger}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserListRow;
