const express = require('express');
const { UserPermissions } = require('../../lib/consts/UserType.enum');
const {
  requirePermissions,
  authenticateToken
} = require('../../middlewares/authentication.middleware');
const router = express.Router();
const {
  getGroups,
  removeManyGroups,
  removeGroup,
  updateGroup,
  getGroupById,
  addGroup
} = require('./group.controller');

router.use(authenticateToken);
router.get(
  '/:groupId',
  requirePermissions(UserPermissions.Read.Group),
  getGroupById
);
router.get('/', requirePermissions(UserPermissions.Read.Group), getGroups);

router.delete(
  '/:groupId',
  requirePermissions(UserPermissions.Edit.Group),
  removeGroup
);
router.delete(
  '/',
  requirePermissions(UserPermissions.Edit.Group),
  removeManyGroups
);

router.put(
  '/:groupId',
  requirePermissions(UserPermissions.Edit.Group),
  updateGroup
);

router.post('/', requirePermissions(UserPermissions.Write.Group), addGroup);

module.exports = router;
