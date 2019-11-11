import { Grid, Input, Form, Select } from "semantic-ui-react";
import { useState } from "react";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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

const AddProduct = () => {
  const { data, error, loading } = useQuery(QUERY);
  const [locationValue, setLocationValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categories, setCategories] = useState([]);

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
    <Form loading={loading}>
      <Form.Group>
        <Form.Input label="Nimi" placeholder="Coca Cola" />
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
          onChange={(e, { catVal }) => {
            setCategoryValue(catVal);
          }}
        />
        <Form.Button label="&nbsp;" primary>
          Lisää tuote
        </Form.Button>
      </Form.Group>
    </Form>
  );
};

export default AddProduct;
