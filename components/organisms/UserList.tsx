import {
  Image,
  Table,
  Container,
  Header,
  Segment,
  Message,
  Icon,
  Input
} from "semantic-ui-react";
import UserListRow from "../molecules/UserListRow";
import useFetch from "use-http";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

const SearchLabel = styled.span`
  margin-right: 1rem;
  font-size: 18px;
  color: #888;
`;

const Logo = () => {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "-1rem",
          fontSize: "3rem",
          paddingBottom: "1rem",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "50px", margin: "auto", display: "block" }}
          />
        </div>
        <div style={{ marginTop: "1rem", marginLeft: "1rem" }}>Namubuffa</div>
      </div>
    </>
  );
};

const UserList = () => {
  const [request, response] = useFetch("/api");
  const [users, setUsers] = useState<any>([]);
  const [initialUsers, setInitialUsers] = useState<any>([]);

  // componentDidMount
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    initializeUsers();
  });

  async function initializeUsers() {
    const initialUsers = await request.get("/getUsers");
    if (response.ok) {
      setInitialUsers(initialUsers.data.user);
      setUsers(initialUsers.data.user);
    }
  }

  if (request.loading) {
    return (
      <Container>
        <Logo />
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
  if (request.error) {
    return (
      <Container>
        <Logo />
        <Message icon negative>
          <Message.Header>Error: {request.error.message}</Message.Header>
        </Message>
      </Container>
    );
  }

  return (
    <Container>
      <Logo />
      <Segment.Group>
        <Header as="h4" attached="top" block>
          Valitse käyttäjä
        </Header>
        <Segment>
          <SearchLabel>Hae nimellä</SearchLabel>
          <Input
            size="big"
            icon="users"
            iconPosition="left"
            placeholder="Markus"
            onChange={event => {
              const filterString = event.target.value;

              setUsers(
                initialUsers.filter(
                  user =>
                    user.name
                      .toLowerCase()
                      .indexOf(filterString.toLowerCase()) > -1
                )
              );
            }}
          />
        </Segment>
        {users ? (
          users
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            })
            .map(data => {
              return (
                <UserListRow
                  key={data.uuid}
                  data={data}
                  refresh={initializeUsers}
                />
              );
            })
        ) : (
          <></>
        )}
      </Segment.Group>
    </Container>
  );
};

export default UserList;
