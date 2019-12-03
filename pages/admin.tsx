import Link from "next/link";
import UserList from "../components/organisms/UserList";
import { Header, Grid, Container, Segment } from "semantic-ui-react";
import styled from "@emotion/styled";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import AddProduct from "../components/organisms/AddProduct";

const QUERY = gql`
  query GetShopAssortment {
    location {
      id
      name
      categories {
        name
        products(where: { Visible: { _eq: true } }) {
          Name
          Description
          Price
          uuid
        }
      }
    }
  }
`;

const Admin = () => {
  // const { data, error, loading } = useQuery(QUERY);
  // if (loading) return <h1>Loading</h1>;
  // if (error) return <h1>Error: {error.message}</h1>;

  return (
    <>
      {/* {JSON.stringify(data, null, 2)} */}
      <Grid>
        <Grid.Row>
          <Grid.Column width={"8"}>Lokaatiot</Grid.Column>
          <Grid.Column width={"8"}>Kategoriat</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={"16"}>{/* <AddProduct /> */}</Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Admin;
