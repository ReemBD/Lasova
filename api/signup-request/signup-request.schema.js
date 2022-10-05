const { Schema } = require('mongoose');

const SignupRequestSchema = new Schema({
  requestingUserId: { type: String, required: true },
  volunteeringProgram: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SignupRequest = model('SignupRequest', SignupRequestSchema);
module.exports = SignupRequest;
