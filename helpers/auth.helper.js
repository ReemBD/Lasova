const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateAuthToken = (data) => {
  return jwt.sign(data, jwtAccessToken);
};

const verifyAuthToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  return decoded || false;
};

const validateEmail = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
  validateEmail,
};
