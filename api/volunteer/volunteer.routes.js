const express = require('express');
const { UserPermissions } = require('../../lib/consts/UserType.enum');
const { requirePermissions, authenticateToken } = require('../../middlewares/authentication.middleware');
const {
  getVolunteers,
  removeVolunteers,
  updateVolunteer,
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
/*  Update Volunteer */
router.put('/:volunteerId', requirePermissions(UserPermissions.Edit.Volunteer), updateVolunteer);
/* Add Volunteer */
router.post('/', requirePermissions(UserPermissions.Write.Volunteer), addVolunteer);

module.exports = router;
