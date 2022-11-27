const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const VolunteeringProgram = Schema({
  _id: { type: String, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false }
});

const Volunteer = new Schema({
  firstName: { type: String, default: '', trim: true },
  lastName: { type: String, default: '', trim: true },
  taz: { type: String, default: '', trim: true },
  cellphone: { type: String, default: '', trim: true },
  email: { type: String, default: '', trim: true },
  city: { type: String, default: '', trim: true },
  volunteerType: { type: String, default: '', trim: true },
  gender: { type: String, default: '', trim: true },
  status: { type: String, default: '', trim: true },
  weekdayAvailability: [{ type: String, default: '' }],
  yearJoined: { type: Number, default: () => new Date().getFullYear() },
  reportedHours: { type: Number, default: 0 },
  approvedHours: { type: Number, default: 0 },
  policeCertification: { type: Boolean, default: false },
  otherDocuments: { type: Boolean, default: false },
  birth: { type: Date, default: Date.now },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  gender: { type: String, trim: true, default: '' },
  policeCertification: { type: Boolean, default: false },
  otherDocuments: { type: Boolean, default: false },
  cellphone: { type: String, trim: true, default: '' },
  email: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  volunteerType: { type: String, trim: true, default: '' },
  yearJoined: { type: Number, default: new Date().getFullYear() },
  weekdayAvailability: [{ type: String, default: '' }],
  status: { type: String, trim: true, default: '' },
  hours: [{ type: Array, default: [] }] // will be array of object like : [{date:'12.03.2022',start:'13:00',end:'16:00',verified:'false'}]
});

module.exports = model('Volunteer', Volunteer);
