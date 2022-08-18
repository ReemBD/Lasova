const express = require('express');
const { UserPermissions } = require('../../lib/consts/UserType.enum');
const {
  requirePermissions,
  authenticateToken,
} = require('../../middlewares/authentication.middleware');
const router = express.Router();
const { login, signup } = require('./auth.controller');

// Non requiring Authentication routes.
router.post('/login', login);
//

router.use(authenticateToken);
router.post('/signup', requirePermissions(UserPermissions.Write.User), signup);

module.exports = router;
