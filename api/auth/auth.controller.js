const { ErrorMessages } = require('../../lib/consts/ErrorMessages');
const { UserTypes } = require('../../lib/consts/UserType.enum');
const authService = require('./auth.service');

const signup = async (req, res) => {
  try {
    const signupForm = req.body;
    authService.signup(signupForm);
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
  signup
};
