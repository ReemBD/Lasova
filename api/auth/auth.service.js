const logger = require('../../services/logger.service');
const userService = require('../user/user.service');
const bcrypt = require('bcrypt');
const { ErrorMessages } = require('../../lib/consts/ErrorMessages');
const { UserStatuses } = require('../../lib/consts/user-status');
const signupRequestService = require('../signup-request/signup-request.service');
const { UserTypes } = require('../../lib/consts/UserType.enum');

const signup = async (signupForm) => {
  try {
    const SALT_ROUNDS = 10;
    const hash = await bcrypt.hash(signupForm.password, SALT_ROUNDS);

    let user = { ...signupForm };
    if (!Array.isArray(user.associatedPrograms)) {
      user.associatedPrograms = [user.associatedPrograms];
    }
    user.userType = UserTypes.Volunteer;
    user.status = UserStatuses.Pending;
    user.hash = hash;
    user = await userService.saveUser(user);

    const { associatedPrograms, _id } = user;
    signupRequestService.add({ requestingUserId: _id, associatedPrograms: associatedPrograms });
    return user;
  } catch (err) {
    logger.error(`err while trying to signup user ${signupForm.email}`, err);
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
