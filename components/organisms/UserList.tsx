import { Image, Table, Container, Header, Segment } from "semantic-ui-react";
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
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
  console.log(data.user);

  return (
    <Container>
      <Segment.Group>
        <Header as="h4" attached="top" block>
          Select user
        </Header>
        {data.user.map(data => {
          return <UserListRow data={data} />;
        })}
      </Segment.Group>
    </Container>
  );
};

export default UserList;
