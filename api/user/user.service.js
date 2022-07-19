const logger = require('../../services/logger.service');
const User = require('./user.schema');

const saveUser = async (user) => {
  try {
    const usernameAlreadyExists = await findUserByEmail(user.email);
    if (usernameAlreadyExists) throw new Error('username already exists');
    user = new User(user);
    user.save();
    return user;
  } catch (err) {
    logger.error(`Error trying to save user ${JSON.stringify(user)}`, err);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    logger.error(
      `Error while trying to find user with username ${username}`,
      err
    );
  }
};

module.exports = {
  saveUser,
  findUserByEmail,
};
