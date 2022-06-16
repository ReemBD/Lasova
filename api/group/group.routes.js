const express = require('express');
const router = express.Router();
const {
  getGroups,
  removeGroups,
  updateGroup,
  getGroupById,
  addGroup,
} = require('./group.controller');

router.get('/:groupId', getGroupById);
router.get('/', getGroups);

router.delete('/', removeGroups);

router.put('/:groupId', updateGroup);

router.post('/', addGroup);

module.exports = router;
