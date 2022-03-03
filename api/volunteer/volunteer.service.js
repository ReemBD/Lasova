const logger = require('../../services/logger.service');
const fs = require('fs/promises');
const path = require('path');
const DEFAULT_VOLUNTEERS_MOCK_DATA_PATH = path.resolve(
  __dirname,
  'mock-data.json'
);
const VOLUNTEERS_MOCK_DATA_PATH = path.resolve(__dirname, 'temp-data.json');
async function query({ isDefault, doReset }) {
  try {
    let volunteersToSend;

    if (JSON.parse(doReset)) {
      const defaultVolunteers = await _getVolunteers(true);
      _setVolunteers(defaultVolunteers, (volunteers) => {
        volunteersToSend = volunteers;
      });
    }

    volunteersToSend = await _getVolunteers(JSON.parse(isDefault));
    return volunteersToSend;
  } catch (err) {
    logger.error(`failed to fetch volunteers` + err);
    throw err;
  }
}

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

async function _getVolunteers(isDefault) {
  const rawdata = await fs.readFile(
    isDefault ? DEFAULT_VOLUNTEERS_MOCK_DATA_PATH : VOLUNTEERS_MOCK_DATA_PATH
  );
  return JSON.parse(rawdata);
}

async function _setVolunteers(volunteers, onResolve = () => {}) {
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
}
module.exports = {
  query,
  remove,
};
