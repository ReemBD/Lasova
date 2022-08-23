const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

// requests can only come from this domains
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: process.env.API_ACCESS_ALLOWED_URIs.split(',')
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
mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Succesfully connected to db', db.db.databaseName);
});

app.use('/api/volunteer', require('./api/volunteer/volunteer.routes'));
app.use('/api/group', require('./api/group/group.routes'));
app.use('/api/auth', require('./api/auth/auth.routes'));
app.use('/api/user', require('./api/user/user.routes'));

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starting the server on http://localhost:PORT
app.listen(process.env.PORT, () => console.log(`Server Is Up!\nhttp://localhost:${process.env.PORT}`));
