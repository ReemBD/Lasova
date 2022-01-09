// for the first time run 'npm install'
// Libraries installed: express, nodemon, dotenv

const express = require('express');
const app = express();

// NOTE: on your local machine, create a '.env' file with PORT=8000
require('dotenv').config();

// Settings up routes, can be found at './routes/'
app.use('/getusers', require('./routes/get_users'));

// Starting the server on http://localhost:8000
app.listen(process.env.PORT || 8000, () => console.log('Server Is Up!\nhttp://localhost:8000'));