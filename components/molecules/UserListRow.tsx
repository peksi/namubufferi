import { Table, Header, Button, Segment, Grid, Icon } from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";
import AddMoney from "./AddMoney";
import { useStoreActions } from "../../store";

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
  const updateUser = useStoreActions(actions => actions.currentUser.updateUser);

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
            <Grid.Column width={6}>
              <Header>
                <Header.Content as="h2">
                  {props.data.name}
                  <Header.Subheader>
                    {props.data.starting_year}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={2}>
              <Header
                as="h3"
                style={{ fontWeight: "normal", lineHeight: "48px" }}
              >
                {props.data.balance.toFixed(2)} €
              </Header>
            </Grid.Column>
            <Grid.Column width={8}>
              <Button size="big" onClick={() => setOpenHistory(!openHistory)}>
                Historia
              </Button>
              <Button size="big" onClick={() => setOpenSaldo(!openSaldo)}>
                Saldo
              </Button>
              <Link
                href={{
                  pathname: "/store"
                }}
              >
                <Button
                  size="big"
                  primary
                  icon
                  labelPosition="right"
                  onClick={() => {
                    updateUser({
                      uuid: props.data.uuid,
                      balance: props.data.balance
                    });
                  }}
                >
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
