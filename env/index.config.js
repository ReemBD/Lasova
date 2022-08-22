require('dotenv').config();

const { NODE_ENV, DB_URI, DB_NAME, API_ACCESS_ALLOWED_URIs, JWT_ACCESS_TOKEN } =
  process.env;

module.exports = {
  env: NODE_ENV,
  dbURI: DB_URI,
  dbName: DB_NAME,
  jwtAccessToken: JWT_ACCESS_TOKEN,
  apiAccessAllowedURIs: API_ACCESS_ALLOWED_URIs.split(',')
};
