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

function _addVolunteer(volunteer) {
  return httpService.post(`${BASE_URL}`, volunteer);
}
