const logger = require('../../services/logger.service');
const userService = require('../user/user.service');
const bcrypt = require('bcrypt');
const { ErrorMessages } = require('../../lib/consts/ErrorMessages');
const { UserStatuses } = require('../../lib/consts/user-status');

const signup = async (signupForm) => {
  try {
    const SALT_ROUNDS = 10;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    signupForm.status = UserStatuses.Pending;
    signupForm.hash = hash;
    const user = await userService.saveUser(signupForm);
    
    // return user.generateBearerAuthToken();
  } catch (err) {
    logger.error(`err while trying to signup user ${restOfUser.email}`, err);
    throw err;
  }
};

const login = async (loggingUser) => {
  try {
    const user = await userService.getUser({ email: loggingUser.email });
    if (!user) {
      throw Error(ErrorMessages.InvalidCredentials);
    }
    const isPasswordCorrect = await user.checkPassword(loggingUser.password);
    if (!isPasswordCorrect) {
      throw Error(ErrorMessages.InvalidCredentials);
    }
    return user.generateBearerAuthToken();
  } catch (err) {
    logger.error(`error while trying to login user ${loggingUser.email}`, err);
    throw err;
  }
};

module.exports = {
  signup,
  login
};
