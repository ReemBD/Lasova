const logger = require('../../services/logger.service');
const { query, remove, update, getById, add } = require('./volunteer.service');
const googleDriveService = require('../../services/google-drive.service');

async function getVolunteers(req, res) {
  try {
    const queryOptions = req.query;
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

async function updateVolunteer(req, res) {
  try {
    const volunteer = req.body;
    const updatedVolunteer = await update(volunteer);
    res.send(updatedVolunteer);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function addVolunteer(req, res) {
  try {
    let {
      body: { document: volunteer },
      files,
    } = req;
    const contentType = req.headers['content-type'];

    if (contentType?.startsWith('multipart/form-data')) {
      volunteer = JSON.parse(volunteer);
    }

    if (!!files) {
      await googleDriveService.createInitialVolunteerFolder(
        volunteer.firstName + ' ' + volunteer.lastName,
        files
      );
    }

    const newVolunteer = await add(volunteer);
    res.send(newVolunteer);
  } catch (err) {
    logger.error(`err while trying to add volunteer`, err);
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
  updateVolunteer,
  addVolunteer,
  getVolunteerById,
};
