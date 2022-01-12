// for the first time run 'npm install'
// Libraries installed: express, nodemon, dotenv
// temporarily libraries: fs

const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

// requests can only come from this domains
app.use(cors({
    origin: process.env.CLIENTS_DOMAIN,
}))

// Settings up routes, can be found at './routes/'
app.use('/users', require('./routes/users/get.js'));

// Starting the server on http://localhost:PORT
app.listen(process.env.PORT, () => console.log(`Server Is Up!\nhttp://localhost:${process.env.PORT}`));