require('dotenv').config();

const { NODE_ENV, DB_URI, DB_NAME, API_ACCESS_ALLOWED_URIs } = process.env;

module.exports = {
  env: NODE_ENV,
  dbURI: DB_URI,
  dbName: DB_NAME,
  apiAccessAllowedURIs: API_ACCESS_ALLOWED_URIs.split(','),
};
