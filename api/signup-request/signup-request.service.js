const SignupRequest = require('./signup-request.schema');

const add = (signupRequest) => {
  try {
    if (!(signupRequest instanceof SignupRequest)) {
      signupRequest = new SignupRequest(signupRequest);
    }
    signupRequest.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  add
};
