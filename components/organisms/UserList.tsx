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
import useFetch from "use-http";

const UserList = () => {
  const { loading, error, data } = useFetch("/api/getUsers", { data: [] }, []);

  if (loading) {
    return (
      <Container>
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Header>
            Ladataan. Jos olet päivän ensimmäinen käyttäjä, tämä kestää yleensä
            hetken.
          </Message.Header>
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

  return (
    <Container>
      <Segment.Group>
        <Header as="h4" attached="top" block>
          Valitse käyttäjä
        </Header>
        {data.data.user.map(data => {
          return <UserListRow key={data.uuid} data={data} />;
        })}
      </Segment.Group>
    </Container>
  );
};

export default UserList;
