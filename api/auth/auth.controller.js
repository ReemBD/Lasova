const authService = require('./auth.service');

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    await authService.signup({ username, password });
    const accessToken = generateAuthToken({ name: username });
    res.json(accessToken);
  } catch (err) {
    res.status(500).send(`Error while trying to signup user ${username}`);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const authToken = await authService.login(user);
    res.json({ authToken });
  } catch (err) {
    res.status(400).send('Invalid Username / Password');
  }
};

module.exports = {
  login,
  signup,
};
