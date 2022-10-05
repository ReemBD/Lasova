const SignupRequest = require('./signup-request.schema');
const logger = require('../../services/logger.service');

const add = async (signupRequest) => {
  try {
    if (!(signupRequest instanceof SignupRequest)) {
      signupRequest = new SignupRequest(signupRequest);
    }
    signupRequest = await signupRequest.save();
    return signupRequest;
  } catch (err) {
    logger.error(`err while trying to add signupRequest`, err);
    throw err;
  }
};

module.exports = {
  add
};
