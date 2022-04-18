import { httpService } from './http-service';

export const volunteerService = {
  saveVolunteer,
  query,
};

const BASE_URL = 'volunteer';

function query({ isDefault, doReset } = {}) {
  return httpService.get(`${BASE_URL}`);
}

function saveVolunteer(volunteer) {
  return volunteer.id ? _updateVolunteer(volunteer) : _addVolunteer(volunteer);
}

function _updateVolunteer(volunteer) {
  return httpService.put(`${BASE_URL}/${volunteer.id}`, volunteer);
}

async function _addVolunteer(volunteer) {
  const { files, ...volunteerJSON } = volunteer;
  const formData = new FormData();
  const json = JSON.stringify(volunteerJSON);
  formData.append('document', json);
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const currFile = files.item(i);
      formData.append(currFile.name, currFile);
    }
  }
  return await httpService.post(`${BASE_URL}`, formData);
}
