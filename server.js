require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const {
  dbURI,
  dbName,
  clientLocalhostPorts,
} = require('./config/index.config');

// requests can only come from this domains
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? '' // todo: add production
        : clientLocalhostPorts.map((port) => `http://localhost:${port}`),
  })
);

// Enables parsing of json req bodies.
app.use(express.json());

// Enables parsing of urlecnoded query entities into js objects.
app.use(express.urlencoded({ extended: true }));
// Enables access to files sent on multipart/form-data req types on req.files
app.use(fileUpload());

// connect to db
mongoose.connect(dbURI, {
  dbName,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Succesfully connected to db', db.db.databaseName);
});

app.use('/api/volunteer', require('./api/volunteer/volunteer.routes'));
app.use('/api/group', require('./api/group/group.routes'));

// Starting the server on http://localhost:PORT
app.listen(process.env.PORT, () =>
  console.log(`Server Is Up!\nhttp://localhost:${process.env.PORT}`)
);
