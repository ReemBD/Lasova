const express = require('express');
const router = express.Router();
const {
  getGroups,
  removeManyGroups,
  removeGroup,
  updateGroup,
  getGroupById,
  addGroup,
} = require('./group.controller');

router.get('/:groupId', getGroupById);
router.get('/', getGroups);

router.delete('/:groupId', removeGroup)
router.delete('/', removeManyGroups);

router.put('/:groupId', updateGroup);

router.post('/', addGroup);

module.exports = router;
