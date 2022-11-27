const logger = require('../../services/logger.service');
const { query, remove, adminUpdate, volunteerUpdate, getById, add } = require('./volunteer.service');
const googleDriveService = require('../../services/google-drive.service');
const { UserTypes } = require('../../lib/consts/UserType.enum');
const { managerProgramsObjectMap } = require('../../lib/manager-program-map');
const jwt = require('jsonwebtoken');
const authenticate = require('../../middlewares/authentication.middleware');

async function getVolunteers(req, res) {
  try {
    const queryOptions = req.query;
    if (req.user.userType === UserTypes.ProgramManager) {
      queryOptions.volunteeringPrograms = managerProgramsObjectMap[req.user.email];
    }
    const volunteers = await query(queryOptions);
    res.send(volunteers);
  } catch (err) {
    res.status(500).send({ err: 'Failed to fetch volunteers' });
  }
}

async function removeVolunteers(req, res) {
  try {
    const volunteerIds = req.query.ids.split(',');
    const updatedVolunteers = await remove(volunteerIds);
    res.send(updatedVolunteers);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function volunteerUpdateVolunteer(req, res) {
  try {
    const volunteer = req.body;
    authenticate.authenticateToken(req,res,()=>console.log('right user'))
    const updatedVolunteer = await volunteerUpdate(volunteer,req.user);
    res.send(updatedVolunteer);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function adminUpdateVolunteer(req, res) {
  try {
    const volunteer = req.body;
    authenticate.authenticateToken(req,res,()=>console.log('right user'))
    const updatedVolunteer = await adminUpdate(volunteer,req.user);
    res.send(updatedVolunteer);
  } catch (err) {
    res.status(500).send(err);
  }
}


async function addVolunteer(req, res) {
  try {
    let {
      body: { document: volunteer },
      files
    } = req;
    const contentType = req.headers['content-type'];

    if (contentType?.startsWith('multipart/form-data')) {
      volunteer = JSON.parse(volunteer);
    }

    if (files) {
      await googleDriveService.createInitialVolunteerFolder(volunteer.firstName + ' ' + volunteer.lastName, files);
    }

    const newVolunteer = await add(volunteer);
    res.send(newVolunteer);
  } catch (err) {
    logger.error('err while trying to add volunteer', err);
    res.status(500).send(err);
  }
}

async function getVolunteerById(req, res) {
  try {
    const { volunteerId } = req.params;
    const volunteer = await getById(volunteerId);
    res.send(volunteer);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getVolunteers,
  removeVolunteers,
  adminUpdateVolunteer,
  volunteerUpdateVolunteer,
  addVolunteer,
  getVolunteerById
};
