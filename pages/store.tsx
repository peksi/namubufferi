import {
  Menu,
  Container,
  Segment,
  Table,
  Header,
  Button
} from "semantic-ui-react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import StoreItemRow from "../components/molecules/StoreItemRow";
import Link from "next/link";

const MarginFixer = styled.div`
  margin-bottom: -2px;
`;

const Store = () => {
  return (
    <>
      <Container>
        <Link href="/">
          <Button danger>Takaisin</Button>
        </Link>
        {/* <MarginFixer> */}
        <Menu attached tabular widths={3}>
          <Menu.Item as="a">Snäkkilaatikot</Menu.Item>
          <Menu.Item active as="a">
            Jääkaappi
          </Menu.Item>
          <Menu.Item as="a">Pakastin</Menu.Item>
        </Menu>
        {/* </MarginFixer> */}
        <Segment attached>
          <Header as="h4" attached="top" block>
            Terveysruoka
          </Header>
          <StoreItemRow />
          <StoreItemRow />
          <StoreItemRow />

          <Header as="h4" attached="top" block>
            Epäterveysruoka
          </Header>
          <StoreItemRow />
          <StoreItemRow />
          <StoreItemRow />
        </Segment>
      </Container>
    </>
  );
};

export default Store;
