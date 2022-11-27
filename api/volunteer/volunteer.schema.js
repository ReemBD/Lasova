const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Volunteer = new Schema({
  volunteeringProgram: { type: String, trim: true, default: '' },
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  taz: { type: String, trim: true, default: '' },
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
