const logger = require('../../services/logger.service');
const userService = require('../user/user.service');
const bcrypt = require('bcrypt');
const { generateAuthToken } = require('../../helpers/auth.helper');
const User = require('../user/user.schema');

const signup = async ({ password, ...restOfUser }) => {
  const SALT_ROUNDS = 10;
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    await userService.saveUser({ ...restOfUser, hash });
    return generateAuthToken({ username: restOfUser.username });
  } catch (err) {
    logger.error(`err while trying to signup user ${user.username}`, err);
    throw err;
  }
};

const login = async (loggingUser) => {
  try {
    let user = await userService.getUser({ email: loggingUser.email });

    const isPasswordCorrect = await user.checkPassword(loggingUser.password);
    if (!isPasswordCorrect) {
      logger.info(
        `unsuccessful login attempt with ${loggingUser.email}, password ${loggingUser.password}`
      );
      throw new Error(`Invalid password`);
    }
    return generateAuthToken(user.toObject());
  } catch (err) {
    logger.error(`err while trying to login user ${loggingUser.username}`, err);
    throw err;
  }
};

module.exports = {
  signup,
  login,
};
