const { google } = require('googleapis');
const { serviceAccountAuth } = require('../lib/service-account-auth');
const logger = require('./logger.service');
const bufferToStream = require('../helpers/buffer-to-stream.helper');
const ROOT_FOLDER_ID = '1v7IbKTbhJeMXR-mN_fSIvOOaXAcuuHQ3';
// const DEFAULT_DATA = [
//   {
//     resource: { name: 'test-file' },
//     media: {
//       mimeType: 'image/jpg',
//       body: fs.createReadStream('mocks/mechnical-keyboard-pic.jpg'),
//     },
//     fields: 'id',
//   },
//   {
//     resource: { name: 'CV' },
//     media: {
//       mimeType: 'application/pdf',
//       body: fs.createReadStream('mocks/CV-Reem-Ben-David.pdf'),
//     },
//     fields: 'id',
//   },
// ];

const drive = google.drive({
  version: 'v3',
  auth: serviceAccountAuth
});

/**
 * */
async function createInitialVolunteerFolder(volunteerName, data) {
  try {
    console.log('creatingInitialVolundeerFolder');
    data = _adjustDataToGoogleDriveApiFormat(data);
    console.log('data: ', data);
    const folder = await createFolder(volunteerName);
    data.forEach((options) => (options.resource.parents = [folder.id]));
    await Promise.all(data.map(uploadFile));
  } catch (err) {
    logger.error('error while trying to create initival volunteer folder', err);
  }
}
async function createFolder(name, customFileMetadata = {}) {
  const fileMetadata = {
    name,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [ROOT_FOLDER_ID],
    ...customFileMetadata
  };
  try {
    console.log('creating folder');
    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id'
    });
    console.log('folder: ', response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function uploadFile(options) {
  try {
    await drive.files.create({ fields: 'id', ...options });
  } catch (err) {
    logger.error('error while trying to upload file to google drive', err);
  }
}

function _adjustDataToGoogleDriveApiFormat(data) {
  return Object.values(data).map((i) => ({
    resource: {
      name: i.name
    },
    media: {
      mimeType: i.mimetype,
      body: bufferToStream(i.data)
    },
    fields: 'id'
  }));
}

module.exports = {
  createInitialVolunteerFolder
};
