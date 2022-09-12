require('dotenv').config();
const mongoose = require('mongoose');
const Group = require('../api/group/group.schema');
const User = require('../api/user/user.schema');
const VolunteeringProgram = require('../api/volunteering-programs/volunteering-program.schema');

const PROD_DB_URI = 'mongodb+srv://Lasova:xyo7ZlvGLRN1qD2G@cluster0.w78mcjz.mongodb.net/?retryWrites=true&w=majority';
const DEV_DB_URI = process.env.DB_URI;

const PROD_DB_NAME = 'prod';
const DEV_DB_NAME = process.env.DB_NAME;

mongoose.connect(PROD_DB_URI, {
  dbName: PROD_DB_NAME
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', async function () {
  const users = await User.find();
  await mongoose.disconnect();
  mongoose.connect(DEV_DB_URI, { dbName: DEV_DB_NAME });
  const devDb = mongoose.connection;
  devDb.once('open', async () => {
    await User.insertMany(users);
  });
});

console.log('testing');

module.exports = {};
