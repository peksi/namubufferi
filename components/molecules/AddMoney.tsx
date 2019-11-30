import {
  Segment,
  Header,
  Button,
  Input,
  Message,
  Modal,
  Image,
  Icon
} from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const SET_MONEY = gql`
  mutation SetNewBalance($money: numeric!, $uuid: uuid!) {
    __typename
    update_user(_set: { balance: $money }, where: { uuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        balance
        name
        starting_year
        uuid
      }
    }
  }
`;

const HowToPayModal = () => (
  <Modal trigger={<Button content="Info" style={{ marginLeft: "1rem" }} />}>
    <Modal.Header>Miten lisään rahaa?</Modal.Header>
    <Modal.Content image>
      <Image wrapped size="medium" src="/namubuffa_mp.png" />
      <Modal.Description>
        <Header>Käteisellä</Header>

        <p>
          Keittiön laatikoston ylälaatikossa on lipas, johon voit sujauttaa
          kotimaiset setelit ja kolikkorahat
        </p>
        <Header>Mobilepayllä</Header>
        <p>
          Skannaa vasemmalla näkyvä koodi sovelluksellasi tai käytä numeroa
          &nbsp;<b>68266</b>
        </p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

interface Props {
  uuid: string;
  closingTrigger: Function;
}

const AddMoney = (props: Props) => {
  const [setMoney, setMoneyResult] = useMutation(SET_MONEY);

  if (setMoneyResult.data) {
    // when done, trigger the function on parent element
    props.closingTrigger();
  }

  return (
    <>
      <Segment secondary>
        <Segment>
          <Header as="h4" attached="top" block>
            Lisää rahaa
          </Header>
          <Formik
            initialValues={{ amount: "" }}
            validate={values => {
              const errors: any = {};
              if (!values.amount) {
                errors.amount = "Syötäthän arvon!";
              } else if (!/^[0-9-,.]*$/i.test(values.amount)) {
                errors.amount = "Numeroita plz";
              } else if (parseFloat(values.amount) < 0) {
                errors.amount =
                  "Lisättävän rahan tulee olla positiivinen arvo!";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setMoney({
                variables: {
                  money: values.amount,
                  uuid: props.uuid
                }
              });
            }}
          >
            {({ isSubmitting }) => (
              <Segment attached="bottom">
                <Form>
                  <Field type="number" name="amount" as={Input} />
                  <HowToPayModal />
                  <Button
                    positive
                    style={{ marginLeft: "1rem" }}
                    type="submit"
                    disabled={isSubmitting}
                    content="Lisää rahaa"
                    icon="plus"
                    labelPosition="right"
                  />
                  <ErrorMessage
                    name="amount"
                    render={msg => <Message error>{msg}</Message>}
                  />
                </Form>
              </Segment>
            )}
          </Formik>
          {setMoneyResult.called ? (
            <Message
              icon
              positive={!setMoneyResult.loading}
              negative={!(typeof setMoneyResult.error === "undefined")}
            >
              {setMoneyResult.loading ? (
                <Icon name="circle notched" loading />
              ) : (
                <Icon name="check square" />
              )}
              <Message.Header>
                {setMoneyResult.error ? setMoneyResult.error.message : <></>}
                {setMoneyResult.data ? "Success!" : <></>}
              </Message.Header>
            </Message>
          ) : (
            <></>
          )}
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

export default AddMoney;
