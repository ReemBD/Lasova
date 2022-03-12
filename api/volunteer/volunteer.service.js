const logger = require('../../services/logger.service');
const fs = require('fs/promises');
const path = require('path');
const DEFAULT_VOLUNTEERS_MOCK_DATA_PATH = path.resolve(
  __dirname,
  'mock-data.json'
);
const VOLUNTEERS_MOCK_DATA_PATH = path.resolve(__dirname, 'temp-data.json');
/**
 * Currently acceps isDefault and doReset as params,
 * doReset - flag that indicates whether should restore data to initial value
 * isDefault - flag that indicates whether should use initial data */
async function query({ isDefault, doReset }) {
  try {
    let volunteersToSend;

    if (JSON.parse(doReset)) {
      const defaultVolunteers = await _getVolunteers(true);
      _setVolunteers(defaultVolunteers);
      volunteersToSend = defaultVolunteers;
    }

    volunteersToSend = await _getVolunteers(JSON.parse(isDefault));
    return volunteersToSend;
  } catch (err) {
    logger.error(`failed to fetch volunteers` + err);
    throw err;
  }
}

async function getById(volunteerId) {
  try {
    const volunteers = await _getVolunteers();
    return volunteers.find((v) => v.id === volunteerId);
  } catch (err) {
    logger.error(`failed to fetch voluntter` + err);
    throw err;
  }
}

async function add(volunteer) {
  try {
    volunteer.id = Math.floor(Math.random() * 10000);
    const volunteers = await _getVolunteers();
    volunteers.unshift(volunteer);
    _setVolunteers(volunteers);
    return volunteer;
  } catch (err) {
    logger.error(`couldn't add volunteer `, err);
    throw err;
  }
}
/**
 * this function gets an array of volunteerIds
 * and removes the corresponding volunteers from the volunteer collection.
 * then returns the updated collection to controller.
 *   */
async function remove(volunteerIds) {
  try {
    const volunteers = await _getVolunteers();
    const newVolunteers = volunteers.filter(
      (v) => !volunteerIds.find((id) => id === v.id)
    );
    _setVolunteers(newVolunteers);
    return newVolunteers;
  } catch (err) {}
}

async function update(volunteer) {
  try {
    const volunteers = await _getVolunteers();
    const volunteerToUpdateIdx = volunteers.findIndex(
      (v) => v.id === volunteer.id
    );
    volunteers.splice(volunteerToUpdateIdx, 1, volunteer);
    _setVolunteers(volunteers);
    return volunteer;
  } catch (err) {
    logger.error(`error updating volunteer ${volunteer.id}`, err);
    throw err;
  }
}

async function _getVolunteers(isDefault) {
  try {
    const rawdata = await fs.readFile(
      isDefault ? DEFAULT_VOLUNTEERS_MOCK_DATA_PATH : VOLUNTEERS_MOCK_DATA_PATH
    );
    return JSON.parse(rawdata);
  } catch (err) {
    throw err;
  }
}

async function _setVolunteers(volunteers, onResolve = () => {}) {
  try {
    fs.writeFile(
      VOLUNTEERS_MOCK_DATA_PATH,
      JSON.stringify(volunteers),
      null,
      async (err) => {
        if (err) {
          return logger.error('could not set volunteers' + err);
        }
        const newVolunteers = await _getVolunteers();
        onResolve(newVolunteers);
      }
    );
  } catch (err) {
    console.log('err: ', err);
    throw err;
  }
}
module.exports = {
  query,
  remove,
  update,
  getById,
  add
};
