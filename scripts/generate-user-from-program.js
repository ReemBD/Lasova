require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../api/user/user.schema');
const { UserStatuses } = require('../lib/consts/user-status');

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
  await User.updateMany({}, { status: UserStatuses.Approved });
  await mongoose.disconnect();

  mongoose.connect(DEV_DB_URI, {
    dbName: DEV_DB_NAME
  });
  const db = mongoose.connection;
  db.once('open', async () => {
    await User.updateMany({}, { status: UserStatuses.Approved });
  });

  // const programs = await VolunteeringProgram.find();
  // let userPasswordMap = {};
  // const users = programs.map((p) => {
  //   const firstname  = p.name || p.email.substring(0, p.email.indexOf('@'));
  //   const email     = p.email;
  //   const nonhashed = require('crypto').randomBytes(4).toString('hex');
  //   const hash      = require('bcrypt').hashSync(nonhashed, 10);
  //   const userType  = UserTypes.ProgramManager;

  //   userPasswordMap[p.email || p.name] = nonhashed

  //   console.log('map: ', JSON.stringify(userPasswordMap,null,2))

  //   return new User({
  //     firstname,
  //     email,
  //     hash,
  //     userType
  //   });
  // });
  // programs.forEach(async (p) => {
  //   try {
  //     const res = await User.findOneAndUpdate(
  //       { email: p.email },
  //       { associatedPrograms: [{ _id: p._id, name: p.name, email: p.email }] }
  //     );
  //     console.log('res: ', res);
  //   } catch (err) {
  //     console.log('error: ', err);
  //   }
  // });
});

module.exports = {};
