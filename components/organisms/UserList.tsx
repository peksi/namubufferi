import { Image, Table, Container, Header, Segment } from "semantic-ui-react";
import UserListRow from "../molecules/UserListRow";
import UserDescription from "../molecules/UserDescription";

const UserList = () => {
  return (
    <Container>
      <Segment.Group>
        <Header as="h4" attached="top" block>
          Select user
        </Header>
        <UserListRow id={0} />
        <UserListRow id={1} />
        <UserListRow id={2} />
      </Segment.Group>
    </Container>
  );
};

export default UserList;