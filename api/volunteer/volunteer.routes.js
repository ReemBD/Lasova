const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {
  getVolunteers,
  getVolunteersByProjectId,
  removeVolunteers,
  updateVolunteer,
  getVolunteerById,
  addVolunteer,
} = require('./volunteer.controller');

const jsonParserMiddleware = bodyParser.json({
  extended: true,
});

router.get('/project/:projectId', getVolunteersByProjectId);
router.get('/:volunteerId', getVolunteerById);
router.get('/', getVolunteers);

router.delete('/', removeVolunteers);

router.put('/:volunteerId', updateVolunteer);

router.post('/', addVolunteer);

module.exports = router;
