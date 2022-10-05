const { ErrorMessages } = require('../../lib/consts/ErrorMessages');
const { UserTypes } = require('../../lib/consts/UserType.enum');
const authService = require('./auth.service');

/**
 * @param { {body: { firstname: string, lastname: string, email: string, password: string } }} request signup request
 */
const signup = async (req, res) => {
  try {
    const signupForm = req.body;
    const user = await authService.signup(signupForm);
    // const signupReq = new SignupRequest({})
    // pendingRequestsService.add(new Pending)
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
