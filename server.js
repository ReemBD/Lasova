const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const {
  env,
  dbURI,
  dbName,
  apiAccessAllowedURIs,
} = require('./env/index.config');
const {
  authenticateToken,
} = require('./middlewares/authentication.middleware');

// requests can only come from this domains
if (env === 'development') {
  app.use(
    cors({
      origin: apiAccessAllowedURIs,
    })
  );
} else {
  app.use(express.static(path.resolve(__dirname, 'public')));
}

// Enables parsing of json req bodies.
app.use(express.json());

// Enables parsing of urlecnoded query entities into js objects.
app.use(express.urlencoded({ extended: true }));
// Enables access to files sent on multipart/form-data req types on req.files
app.use(fileUpload());

// connect to db
mongoose.connect(dbURI, {
  dbName,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Succesfully connected to db', db.db.databaseName);
});

app.all('/api/*', authenticateToken);
app.use('/api/volunteer', require('./api/volunteer/volunteer.routes'));
app.use('/api/group', require('./api/group/group.routes'));
app.use('/api/auth', require('./api/auth/auth.routes'));
app.use('/api/user', require('./api/user/user.routes'));

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starting the server on http://localhost:PORT
app.listen(process.env.PORT, () =>
  console.log(`Server Is Up!\nhttp://localhost:${process.env.PORT}`)
);
