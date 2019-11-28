import {
  Grid,
  Input,
  Form,
  Select,
  Segment,
  Message,
  Icon
} from "semantic-ui-react";
import React, { useState } from "react";

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const QUERY = gql`
  query AdminLocationCategory {
    __typename
    location {
      id
      name
      visible
      categories {
        id
        name
      }
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation PekkaBalance2e($money: numeric!) {
    __typename
    update_user(
      _set: { balance: $money }
      where: { uuid: { _eq: "29cc0933-a9af-4dfc-8baa-78a8cb0fd9dd" } }
    ) {
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

const AddProduct = () => {
  const { data, error, loading } = useQuery(QUERY);
  const [addProduct, addResult] = useMutation(ADD_PRODUCT);
  // populate categories
  const [categories, setCategories] = useState([]);
  // Dropdown value
  const [locationValue, setLocationValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);

  console.log("addResult", addResult);

  let locations = [];

  if (data) {
    locations = data.location.map(i => {
      return { key: i.id, text: i.name, value: i.id, categories: i.categories };
    });
  }

  const updateCategories = (location: number, data: any) => {
    setCategories(
      data
        .find(i => i.key === location)
        .categories.map(i => {
          return { key: i.id, text: i.name, value: i.id };
        })
    );
  };

  return (
    <Form loading={loading} name="addProductToDatabase">
      <Form.Group>
        <Form.Input name="productName" label="Nimi" placeholder="Coca Cola" />
        <Form.Input name="productPrice" label="Hinta" placeholder="1.00" />
        <Form.Select
          control={Select}
          label="Paikka"
          options={locations}
          value={locationValue}
          onChange={(_, { value }) => {
            setLocationValue(value);
            updateCategories(Number(value), locations);
          }}
        />
        <Form.Select
          control={Select}
          label="Luokka"
          options={categories}
          value={categoryValue}
          onChange={(e, { value }) => {
            setCategoryValue(value);
          }}
        />
        <Form.Button
          label="&nbsp;"
          primary
          onClick={() => {
            const nameValue = (document.querySelector(
              "form[name=addProductToDatabase] input[name=productName]"
            ) as HTMLInputElement).value;
            const priceValue = (document.querySelector(
              "form[name=addProductToDatabase] input[name=productPrice]"
            ) as HTMLInputElement).value;

            console.log(categoryValue);
            console.log({
              name: nameValue,
              price: priceValue,
              category: categoryValue
            });

            addProduct({
              variables: {
                name: nameValue,
                price: priceValue,
                category: categoryValue
              }
            });
          }}
        >
          Lisää tuote
        </Form.Button>
      </Form.Group>

      {addResult.called ? (
        <Message
          icon
          positive={!addResult.loading}
          negative={!(typeof addResult.error === "undefined")}
        >
          {addResult.loading ? (
            <Icon name="circle notched" loading />
          ) : (
            <Icon name="check square" />
          )}
          <Message.Header>
            {addResult.error ? addResult.error.message : <></>}
            {addResult.data ? "Success!" : <></>}
          </Message.Header>
        </Message>
      ) : (
        <></>
      )}
    </Form>
  );
};

export default AddProduct;
