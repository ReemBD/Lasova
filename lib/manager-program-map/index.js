const managerProgramsObjectMap = require(_getPath());
const fs = require('fs');
const path = require('path');
const logger = require('../../services/logger.service');

async function addProgram (managerEmail, programName) {
  const _path = _getPath();
  managerProgramsObjectMap[managerEmail] = managerProgramsObjectMap[
    managerEmail
  ]
    ? [...managerProgramsObjectMap[managerEmail], programName]
    : [programName];
  return new Promise((resolve) => {
    fs.writeFile(
      path.join(__dirname, _path),
      JSON.stringify(managerProgramsObjectMap, null, 2),
      () => {
        logger.info(
          `Added new program ${programName} managed by usre ${managerEmail}`
        );
        return resolve('Added program succesfully');
      }
    );
  });
}

function _getPath () {
  const FILE_PREFIX = 'manager-program-map';
  const DEV_SUFFIX = 'dev';
  const PROD_SUFFIX = 'prod';
  process.env.NODE_ENV = 'development';
  let retval;
  switch (process.env.NODE_ENV) {
    case 'development':
      retval = `./${FILE_PREFIX}.${DEV_SUFFIX}.json`;
      break;
    case 'production':
      retval = `./${FILE_PREFIX}.${PROD_SUFFIX}.json`;
    default:
      break;
  }
  return retval;
}

module.exports = {
  managerProgramsObjectMap,
  addProgram
};
