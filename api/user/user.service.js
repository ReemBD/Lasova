const { UserTypePermissionsMap } = require('../../lib/consts/UserType.enum');
const logger = require('../../services/logger.service');
const User = require('./user.schema');

const saveUser = async (user) => {
  try {
    const usernameAlreadyExists = await getUser(user.email);
    if (usernameAlreadyExists) throw new Error('username already exists');
    user = new User(user);
    user.save();
    return user;
  } catch (err) {
    logger.error(`Error trying to save user ${JSON.stringify(user)}`, err);
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
      `Error while trying to find users by criteria ${JSON.stringify(
        query,
        null,
        2
      )}`,
      err
    );
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
      `Error while trying to find user by criteria ${JSON.stringify(
        query,
        null,
        2
      )}`,
      err
    );
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
