const express = require('express');
const { UserPermissions } = require('../../lib/consts/UserType.enum');
const {
  authenticateToken,
  getIsPermitted,
} = require('../../middlewares/authentication.middleware');
const router = express.Router();
const {
  getVolunteers,
  removeVolunteers,
  updateVolunteer,
  getVolunteerById,
  addVolunteer,
} = require('./volunteer.controller');

router.get(
  '/:volunteerId',
  getIsPermitted(UserPermissions.Read.Volunteer),
  getVolunteerById
);
router.get('/', getIsPermitted(UserPermissions.Read.Volunteer), getVolunteers);

router.delete(
  '/',
  getIsPermitted(UserPermissions.Edit.Volunteer),
  removeVolunteers
);

router.put(
  '/:volunteerId',
  getIsPermitted(UserPermissions.Edit.Volunteer),
  updateVolunteer
);

router.post('/', getIsPermitted(UserPermissions.Write.Volunteer), addVolunteer);

module.exports = router;
