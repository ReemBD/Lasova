const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();

// requests can only come from this domains
app.use(
  cors({
    origin: '*',
  })
);

// Settings up routes, can be found at './routes/'
app.use('/api/volunteer', require('./api/volunteer/volunteer.routes'));

// Starting the server on http://localhost:PORT
app.listen(process.env.PORT, () =>
  console.log(`Server Is Up!\nhttp://localhost:${process.env.PORT}`)
);
