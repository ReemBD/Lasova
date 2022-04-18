const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');

require('dotenv').config();

// requests can only come from this domains
app.use(
  cors({
    origin: '*',
  })
);

// Enables parsing of json req bodies.
app.use(express.json());
// Enables parsing of urlecnoded query entities into js objects.
app.use(express.urlencoded({ extended: true }));
// Enables access to files sent on multipart/form-data req types on req.files
app.use(fileUpload());

// Settings up routes, can be found at './routes/'
app.use('/api/volunteer', require('./api/volunteer/volunteer.routes'));

// Starting the server on http://localhost:PORT
app.listen(process.env.PORT, () =>
  console.log(`Server Is Up!\nhttp://localhost:${process.env.PORT}`)
);
