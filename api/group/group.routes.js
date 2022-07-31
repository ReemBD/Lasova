const express = require('express');
const { UserPermissions } = require('../../lib/consts/UserType.enum');
const {
  getIsPermitted,
} = require('../../middlewares/authentication.middleware');
const router = express.Router();
const {
  getGroups,
  removeManyGroups,
  removeGroup,
  updateGroup,
  getGroupById,
  addGroup,
} = require('./group.controller');

router.get(
  '/:groupId',
  getIsPermitted(UserPermissions.Read.Group),
  getGroupById
);
router.get('/', getIsPermitted(UserPermissions.Read.Group), getGroups);

router.delete(
  '/:groupId',
  getIsPermitted(UserPermissions.Edit.Group),
  removeGroup
);
router.delete(
  '/',
  getIsPermitted(UserPermissions.Edit.Group),
  removeManyGroups
);

router.put(
  '/:groupId',
  getIsPermitted(UserPermissions.Edit.Group),
  updateGroup
);

router.post('/', getIsPermitted(UserPermissions.Write.Group), addGroup);

module.exports = router;
