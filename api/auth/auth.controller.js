const { ErrorMessages } = require('../../lib/consts/ErrorMessages');
const { UserTypes } = require('../../lib/consts/UserType.enum');
const { addProgram } = require('../../lib/managerProgramMap.index');
const authService = require('./auth.service');

const signup = async (req, res) => {
  try {
    const user = req.body;
    if (user.userType === UserTypes.ProgramManager) {
      if (!user.managedProgram) {
        return res.status(400).send(ErrorMessages.NoProgramSupplied);
      }
      addProgram(user.email, user, managedProgram);
    }
    const authToken = await authService.signup(user);
    res.json({ authToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const authToken = await authService.login(user);
    res.json({ authToken });
  } catch (err) {
    if (err.message === ErrorMessages.InvalidCredentials) {
      return res.status(400).send(err.message);
    }
    res.status(500).send(err);
  }
};

module.exports = {
  login,
  signup,
};
