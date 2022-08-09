const express = require('express');
const { UserPermissions } = require('../../lib/consts/UserType.enum');
const {
  requirePermissions,
  authenticateToken,
} = require('../../middlewares/authentication.middleware');
const router = express.Router();
const { getUserPermissions, getUsers } = require('./user.controller');

router.use(authenticateToken);
router.get('/', requirePermissions(UserPermissions.Read.User), getUsers);
router.get('/permissions', getUserPermissions);
module.exports = router;
