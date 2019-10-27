import { Menu, Container, Segment, Table, Header } from "semantic-ui-react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

const MarginFixer = styled.div`
  /* padding-left: 1px; */
  margin-bottom: -2px;
`;

const Store = () => {
  return (
    <Container>
      <MarginFixer>
        <Menu attached tabular widths={3}>
          <Menu.Item active as="a">
            Snäkkilaatikot
          </Menu.Item>
          <Menu.Item as="a">Jääkaappi</Menu.Item>
          <Menu.Item as="a">Pakastin</Menu.Item>
        </Menu>
      </MarginFixer>
      <Segment attached>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Namu</Table.HeaderCell>
              <Table.HeaderCell>Hinta</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Header.Content>
                    Lena
                    <Header.Subheader>Human Resources</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>22</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Header.Content>
                    Matthew
                    <Header.Subheader>Fabric Design</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>15</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Header.Content>
                    Lindsay
                    <Header.Subheader>Entertainment</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>12</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Header.Content>
                    Mark
                    <Header.Subheader>Executive</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>11</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </Container>
  );
};

export default Store;
