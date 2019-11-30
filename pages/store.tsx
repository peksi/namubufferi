import {
  Menu,
  Container,
  Segment,
  Table,
  Header,
  Button,
  Message
} from "semantic-ui-react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import StoreItemRow from "../components/molecules/StoreItemRow";
import Link from "next/link";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useState } from "react";

const PRODUCTS = gql`
  query HajeTuotteet {
    __typename
    location {
      id
      name
      visible
      categories {
        id
        location
        name
        products {
          Name
          Price
          uuid
        }
      }
    }
  }
`;

const MarginFixer = styled.div`
  margin-bottom: -2px;
`;

const Store = () => {
  const [tab, setTab] = useState(1);
  const { data, error, loading } = useQuery(PRODUCTS);

  if (loading) {
    return (
      <Container>
        <Link href="/">
          <Button negative>Takaisin</Button>
        </Link>
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

  console.log(data.location.find(i => i.id == tab));

  return (
    <>
      <Container>
        <Link href="/">
          <Button negative>Takaisin</Button>
        </Link>
        <MarginFixer>
          <Menu attached tabular widths={data.location.length}>
            {data.location.map(i => {
              return (
                <Menu.Item
                  onClick={() => setTab(i.id)}
                  as="a"
                  active={tab == i.id}
                  key={i.id}
                >
                  {i.name}
                </Menu.Item>
              );
            })}
          </Menu>
        </MarginFixer>

        {data.location
          .find(i => i.id == tab)
          .categories.map(i => {
            return (
              <Segment attached>
                <Header as="h4" attached="top" block>
                  {i.name}
                </Header>
                {i.products.map(j => {
                  console.log(j);
                  return <StoreItemRow product={j} />;
                })}
              </Segment>
            );
          })}
      </Container>
    </>
  );
};

export default Store;
