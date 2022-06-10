const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
  groupName: String,
  firstName: String,
  lastName: String,
  taz: String,
  birth: { type: Date, default: Date.now },
  gender: String,
  policeCertification: Boolean,
  otherDocuments: Boolean,
  cellphone: String,
  email: String,
  city: String,
  volunteerType: String,
  yearJoined: Number,
  weekdayAvailability: [Number],
  status: String,
  reportedHours: Number,
  approvedHours: Number,
});
