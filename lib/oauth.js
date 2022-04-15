const { GoogleAuth } = require('google-auth-library');

const client_id =
  '12124717483-r9ce3jcd6aevbt1vlii43n5g5544suaa.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uris = ['https://developers.google.com/oauthplayground'];
const refresh_token =
  '1//04AcWxcn5XusWCgYIARAAGAQSNwF-L9Ir9lLspay_S7h5D-GmlJfvTV5G8jYQGAcExSGFlOyGGZg1T2q4w3symbIBIUO6M38ySk4';
const key_file_path = './lib/service-account-creds.json';
const scopes = ['https://www.googleapis.com/auth/drive'];
const oauth2Client = new GoogleAuth({
  keyFile: key_file_path,
  scopes,
});

// oauth2Client.setCredentials({ refresh_token });

module.exports = {
  oauth2Client,
};
