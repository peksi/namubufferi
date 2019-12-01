import {
  Image,
  Table,
  Container,
  Header,
  Segment,
  Message,
  Icon
} from "semantic-ui-react";
import UserListRow from "../molecules/UserListRow";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const USERS = gql`
  query Users {
    __typename
    user {
      name
      starting_year
      balance
      uuid
      transactions(order_by: { timestamp: asc }, limit: 5) {
        product
        amount
        sum
        timestamp
      }
    }
  }
`;

const UserList = () => {
  const { data, error, loading } = useQuery(USERS);
  if (loading) {
    return (
      <Container>
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Header>Loading</Message.Header>
        </Message>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Message icon negative>
          <Message.Header>Error: {error.message}</Message.Header>
        </Message>
      </Container>
    );
  }
  console.log(data.user);

  return (
    <Container>
      <Segment.Group>
        <Header as="h4" attached="top" block>
          Valitse käyttäjä
        </Header>
        {data.user.map(data => {
          return <UserListRow key={data.uuid} data={data} />;
        })}
      </Segment.Group>
    </Container>
  );
};

export default UserList;
