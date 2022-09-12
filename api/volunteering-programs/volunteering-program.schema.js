const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { validateEmail } = require('../../helpers/auth.helper');
const { ErrorMessages } = require('../../lib/consts/ErrorMessages');

const VProgramAddress = Schema({
    city:   { type: String, required: true },
    street: {
      name:   { type: String, required: true },
      number: { type: Number, required: true }
    }
});

const Association = Schema({
    name:   { type: String, required: false},
    _id:    { type: String, required: false},
});

const VolunteeringProgram = new Schema({
  name:     { type: String, required: true , trim: true },
  email:    { type: String, required: false, trim: true },
  phone:    { type: String, required: false, trim: true },
  association: 
            { type: Association,     required: false    },
  address:  { type: VProgramAddress, required: false    },
}
,
{collection: 'volunteeringPrograms'}
);

module.exports = model('VolunteeringProgram', VolunteeringProgram);
