const express = require('express');
const router = express.Router();
const {
  getVolunteers,
  getVolunteersByProjectId,
} = require('./volunteer.controller');

router.get('/', getVolunteers);
router.get('/:projectId', getVolunteersByProjectId);

module.exports = router;
