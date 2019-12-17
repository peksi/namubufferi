require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  env: {
    hasura_key: process.env.HASURA_ADMIN_SECRET,
    api_url: process.env.API_URL
  }
};
