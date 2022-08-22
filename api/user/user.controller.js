const userService = require('./user.service');

const getUsers = async (req, res) => {};

const getUserPermissions = async (req, res) => {
  try {
    const { user } = req;
    const retval = userService.getUserPermissions(user);
    res.send(retval);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getUsers,
  getUserPermissions
};
