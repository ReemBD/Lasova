module.exports = {
  env: process.env.NODE_ENV,
  dbURI: process.env.DB_URI,
  dbName: process.env.DB_NAME,
  clientLocalhostPorts: process.env.CLIENT_LOCALHOST_SUPPORTED_PORTS.split(','),
};
