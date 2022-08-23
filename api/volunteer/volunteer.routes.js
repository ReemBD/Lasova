const express = require('express');
const { UserPermissions } = require('../../lib/consts/UserType.enum');
const { requirePermissions, authenticateToken } = require('../../middlewares/authentication.middleware');
const router = express.Router();
const {
  getVolunteers,
  removeVolunteers,
  updateVolunteer,
  getVolunteerById,
  addVolunteer
} = require('./volunteer.controller');

router.use(authenticateToken);
router.get('/:volunteerId', requirePermissions(UserPermissions.Read.Volunteer), getVolunteerById);
router.get('/', requirePermissions(UserPermissions.Read.Volunteer), getVolunteers);

router.delete('/', requirePermissions(UserPermissions.Edit.Volunteer), removeVolunteers);

router.put('/:volunteerId', requirePermissions(UserPermissions.Edit.Volunteer), updateVolunteer);

router.post('/', requirePermissions(UserPermissions.Write.Volunteer), addVolunteer);

module.exports = router;
