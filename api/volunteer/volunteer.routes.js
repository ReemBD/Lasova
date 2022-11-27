const express = require('express');
const { UserPermissions } = require('../../lib/consts/UserType.enum');
const { requirePermissions, authenticateToken } = require('../../middlewares/authentication.middleware');
const {
  getVolunteers,
  removeVolunteers,
  adminUpdateVolunteer,
  volunteerUpdateVolunteer,
  getVolunteerById,
  addVolunteer
} = require('./volunteer.controller');

const router = express.Router();
router.use(authenticateToken);

/* Get Volunteer by Id (Alias route) */
router.get('/:volunteerId', requirePermissions(UserPermissions.Read.Volunteer), getVolunteerById);
/* Get Many Volunteers, By Query  */
router.get('/', requirePermissions(UserPermissions.Read.Volunteer), getVolunteers);
/*  Delete Volunteers */
router.delete('/', requirePermissions(UserPermissions.Edit.Volunteer), removeVolunteers);

router.put('/admin/:volunteerId', requirePermissions(UserPermissions.Edit.Volunteer), adminUpdateVolunteer);
router.put('/volunteer/:volunteerId', requirePermissions(UserPermissions.Edit.VolunteerHours), volunteerUpdateVolunteer);

router.post('/', requirePermissions(UserPermissions.Write.Volunteer), addVolunteer);

module.exports = router;
