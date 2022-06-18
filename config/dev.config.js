const {
  NODE_ENV,
  DB_URI,
  DB_NAME,
  CLIENT_LOCALHOST_SUPPORTED_PORTS
} = process.env;

module.exports = {
  env: NODE_ENV,
  dbURI: DB_URI,
  dbName: DB_NAME,
  clientLocalhostPorts: CLIENT_LOCALHOST_SUPPORTED_PORTS.split(','),
};
