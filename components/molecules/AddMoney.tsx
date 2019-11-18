import { Segment, Header, Button, Input, Message } from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface Props {
  uuid: string;
}

const AddMoney = (props: Props) => {
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
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Segment attached="bottom">
                <Form>
                  <Field type="number" name="amount" as={Input} />
                  <Button
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
