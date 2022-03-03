const express = require('express');
const router = express.Router();
const {
  getVolunteers,
  getVolunteersByProjectId,
  removeVolunteers,
} = require('./volunteer.controller');

router.get('/', getVolunteers);
router.delete('/', removeVolunteers);
router.get('/:projectId', getVolunteersByProjectId);

module.exports = router;
