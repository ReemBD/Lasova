const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {
  getVolunteers,
  getVolunteersByProjectId,
  removeVolunteers,
  updateVolunteer,
  getVolunteerById,
  addVolunteer
} = require('./volunteer.controller');

const jsonParser = bodyParser.json();

router.get('/project/:projectId', getVolunteersByProjectId);
router.get('/:volunteerId', getVolunteerById);
router.get('/', getVolunteers);

router.delete('/', removeVolunteers);

router.put('/:volunteerId', jsonParser, updateVolunteer);

router.post('/', jsonParser, addVolunteer);

module.exports = router;
