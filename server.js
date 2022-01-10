// for the first time run 'npm install'
// Libraries installed: express, nodemon, dotenv
// temporarily libraries: fs

const express = require('express');
const app = express();

// NOTE: on your local machine, create a '.env' file with PORT=8000
require('dotenv').config();

// Settings up routes, can be found at './routes/'
app.use('/users', require('./routes/users/get.js'));

// Starting the server on http://localhost:8000
app.listen(process.env.PORT || 8000, () => console.log('Server Is Up!\nhttp://localhost:8000'));