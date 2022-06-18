const express = require('express');
const router = express.Router();
const {
  getVolunteers,
  getVolunteersByProjectId,
  removeVolunteers,
  updateVolunteer,
  getVolunteerById,
  addVolunteer,
} = require('./volunteer.controller');

router.get('/:volunteerId', getVolunteerById);
router.get('/', getVolunteers);

router.delete('/', removeVolunteers);

router.put('/:volunteerId', updateVolunteer);

router.post('/', addVolunteer);

module.exports = router;
