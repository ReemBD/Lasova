const { GoogleAuth } = require('google-auth-library');

const key_file_path = './lib/service-account-creds.json';
const scopes = ['https://www.googleapis.com/auth/drive'];
/**
 * We are using service account for the drive api.
 * The service account serves as a dummy user which
 * receives editting + reading permissions for the lasova drive folder
 * and thus saving us the login and permissions enabling process */
const serviceAccountAuth = new GoogleAuth({
  keyFile: key_file_path,
  scopes,
});

module.exports = {
  serviceAccountAuth,
};
