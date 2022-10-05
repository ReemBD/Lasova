const { Schema, model } = require('mongoose');

const AssociatedProgram = { type: { _id: String, name: String, email: String } };

const SignupRequestSchema = new Schema({
  requestingUserId: { type: String, required: true },
  associatedPrograms: [AssociatedProgram],
  createdAt: { type: Date, default: Date.now }
});

const SignupRequest = model('SignupRequest', SignupRequestSchema);
module.exports = SignupRequest;
