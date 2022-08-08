const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Volunteer = new Schema({
  groupName: { type: String, trim: true, default: '' },
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  taz: { type: String, trim: true, default: '' },
  birth: { type: Date, required: false },
  gender: { type: String, trim: true, default: '' },
  policeCertification: { type: Boolean, default: false },
  otherDocuments: { type: Boolean, default: false },
  cellphone: { type: String, trim: true, default: '' },
  email: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  volunteeringProgram: { type: String, trim: true, default: '' },
  yearJoined: { type: Number, default: () => new Date().getFullYear() },
  weekdayAvailability: [{ type: String, default: '' }],
  status: { type: String, trim: true, default: '' },
  reportedHours: { type: Number, default: 0 },
  approvedHours: { type: Number, default: 0 },
});

module.exports = model('Volunteer', Volunteer);
