const { google } = require('googleapis');
const fs = require('fs');
const { oauth2Client } = require('../lib/oauth');

const ROOT_FOLDER_ID = '1v7IbKTbhJeMXR-mN_fSIvOOaXAcuuHQ3';
const DEFAULT_DATA = [
  {
    resource: { name: 'test-file' },
    media: {
      mimeType: 'image/jpg',
      body: fs.createReadStream('mocks/mechnical-keyboard-pic.jpg'),
    },
    fields: 'id',
  },
  {
    resource: { name: 'CV' },
    media: {
      mimeType: 'application/pdf',
      body: fs.createReadStream('mocks/CV-Reem-Ben-David.pdf'),
    },
    fields: 'id',
  },
];

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

/**
 * */
async function createInitialVolunteerFolder(
  volunteerName,
  data = DEFAULT_DATA
) {
  try {
    const folder = await createFolder(volunteerName);
    data.forEach((options) => (options.resource.parents = [folder.id]));
    await Promise.all(data.map(uploadFile));
  } catch (err) {
    console.error(err);
  }
}
async function createFolder(name, customFileMetadata = {}) {
  const fileMetadata = {
    name,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [ROOT_FOLDER_ID],
    ...customFileMetadata,
  };
  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
    console.log('folder: ', response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function uploadFile(options) {
  try {
    const response = await drive.files.create({ fields: 'id', ...options });

    console.log('file uploaded: ', response.data);
  } catch (err) {
    console.log('err trying to uploadfile: ', err);
  }
}

createInitialVolunteerFolder('Testing');

module.exports = {
  createInitialVolunteerFolder,
};
