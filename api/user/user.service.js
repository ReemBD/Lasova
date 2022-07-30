const logger = require('../../services/logger.service');
const User = require('./user.schema');
const { prettified } = require('../../helpers/prettified.helper');
const { ErrorMessages } = require('../../lib/consts/ErrorMessages');

const saveUser = async (user) => {
  try {
    const userAlreadyExists = await getUser(_buildUserCriteria(user));
    if (userAlreadyExists) throw new Error(ErrorMessages.UserAlreadyExists);
    user = new User(user);
    await user.save();
    return user;
  } catch (err) {
    logger.error(`Error trying to save user ${prettified(user)}`, err);
    throw err;
  }
};

/**
 * @param {{email?: string, firstname?: string, lastname?: string, _id?:string, userType?: userTypeEnum}} query user query object
 * */
const getManyUsers = async (query = {}) => {
  try {
    const criteria = _buildUserCriteria(query);
    const users = await User.find(criteria);
    return users;
  } catch (err) {
    logger.error(
      `Error while trying to find users by criteria ${prettified(query)}`,
      err
    );
    throw err;
  }
};

/**
 * @param {{email?: string, firstname?: string, lastname?: string, _id?:string, userType?: userTypeEnum}} query user query object
 * */
const getUser = async (query = {}) => {
  try {
    const criteria = _buildUserCriteria(query);
    const user = await User.findOne(criteria);
    return user;
  } catch (err) {
    logger.error(
      `Error while trying to find user by criteria ${prettified(query)}`,
      err
    );
    throw err;
  }
};

/**
 * @param {{email?: string, firstname?: string, lastname?: string, _id?:string, userType?: userTypeEnum}} query user query object
 * */
const _buildUserCriteria = (query) => {
  const { email = '' } = query;
  let retval = {
    email,
  };

  return retval;
};

module.exports = {
  saveUser,
  getUser,
  getManyUsers,
};
