const { ErrorMessages } = require('../../lib/consts/ErrorMessages');
const { UserTypes } = require('../../lib/consts/UserType.enum');
const authService = require('./auth.service');

/**
 * @param { {body: { firstname: string, lastname: string, email: string, associatedPrograms: string[], password: string } }} request signup request
 */
const signup = async (req, res) => {
  try {
    const signupForm = req.body;
    console.log('signupForm: ', JSON.stringify(signupForm, null, 2));
    const user = await authService.signup(signupForm);
    res.send('Signup successful');
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
