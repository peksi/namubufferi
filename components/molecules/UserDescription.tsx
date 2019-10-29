import { Segment, Header, Button, Input } from "semantic-ui-react";

const UserDescription = () => {
  return (
    <>
      <Segment secondary>
        <Segment>
          <Header as="h4" attached="top" block>
            Lisää rahaa
          </Header>
          <Segment attached="bottom">
            <Input
              action={{
                labelPosition: "right",
                icon: "plus",
                content: "Lisää rahaa"
              }}
              placeholder=""
              defaultValue="0.00"
            />
          </Segment>
        </Segment>
        <Segment>
          <Header as="h4" attached="top" block>
            Edelliset ostokset
          </Header>
          <Segment attached>Yksi</Segment>
          <Segment attached>Kaksi</Segment>
          <Segment attached>Kolme</Segment>
          <Segment attached>Neljä</Segment>
          <Segment attached="bottom">Viisi</Segment>
        </Segment>
      </Segment>
    </>
  );
};

export default UserDescription;
