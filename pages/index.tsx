import Link from "next/link";
import UserList from "../components/organisms/UserList";
import { Header, Grid, Container, Segment } from "semantic-ui-react";
import Store from "../components/organisms/Store";
import styled from "@emotion/styled";

const Padding = styled.div`
  padding: 3rem;
`;

const Index = () => (
  <Padding>
    <Header as="h3" content="Namubufferi" textAlign="center" />
    <Grid columns={2} stackable>
      <Grid.Column>
        <UserList />
      </Grid.Column>
      <Grid.Column>
        <Store />
      </Grid.Column>
    </Grid>
  </Padding>
);

export default Index;
