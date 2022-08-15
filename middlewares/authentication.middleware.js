const jwt = require('jsonwebtoken');
const User = require('../api/user/user.schema');
const { ErrorMessages } = require('../lib/consts/ErrorMessages');
const { UserTypes } = require('../lib/consts/UserType.enum');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.LASOVA_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const requirePermissions = (...requiredPermissions) => {
  return (req, res, next) => {
    let { user } = req;
    if (!user) throw Error('No user found. First authenticate token!');
    user = new User(user);
    if (user.userType === UserTypes.Master) return next();
    if (!requiredPermissions.every((p) => user.permissions.includes(p))) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  requirePermissions,
};
