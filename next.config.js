require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  env: {
    hasura_key: process.env.HASURA_ADMIN_SECRET,
    api_url: process.env.API_URL
  }
  // serverRuntimeConfig: {
  //   // Will only be available on the server side
  //   hasura_key: process.env.HASURA_ADMIN_SECRET
  // },
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   api_url: process.env.API_URL
  // }
};
