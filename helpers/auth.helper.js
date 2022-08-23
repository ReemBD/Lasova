const jwt = require('jsonwebtoken');

const verifyAuthToken = (token) => {
  const decoded = jwt.verify(token, process.env.LASOVA_ACCESS_TOKEN_SECRET);
  return decoded || false;
};

const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

module.exports = {
  verifyAuthToken,
  validateEmail
};
