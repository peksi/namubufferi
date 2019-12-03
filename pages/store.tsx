import {
  Menu,
  Container,
  Segment,
  Header,
  Button,
  Message
} from "semantic-ui-react";
import styled from "@emotion/styled";
import StoreItemRow from "../components/molecules/StoreItemRow";
import Link from "next/link";
import { useState } from "react";
import useAxios from "axios-hooks";

const MarginFixer = styled.div`
  margin-bottom: -2px;
`;

const Store = () => {
  const [tab, setTab] = useState(1);
  const [{ data, loading, error }, refetch] = useAxios("/api/store");

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

  return (
    <>
      <Container>
        <Link href="/">
          <Button negative style={{ marginBottom: "1rem" }}>
            Takaisin
          </Button>
        </Link>
        <MarginFixer>
          <Menu attached tabular widths={data.data.location.length}>
            {data.data.location.map(i => {
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

        {data.data.location
          .find(i => i.id == tab)
          .categories.sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
          .map(i => {
            return (
              <Segment key={i.id} attached>
                <Header as="h4" attached="top" block>
                  {i.name}
                </Header>
                {i.products
                  .sort((a, b) => {
                    return a.Name.localeCompare(b.Name);
                  })
                  .map(j => {
                    return <StoreItemRow key={j.uuid} product={j} />;
                  })}
              </Segment>
            );
          })}
      </Container>
    </>
  );
};

export default Store;
