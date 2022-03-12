import { httpService } from './http-service';

export const volunteerService = {
  saveVolunteer,
};

const BASE_URL = 'volunteer';

async function saveVolunteer(volunteer) {
  return volunteer.id ? _updateVolunteer(volunteer) : _addVolunteer(volunteer);
}

async function _updateVolunteer(volunteer) {
  return httpService.put(`${BASE_URL}/${volunteer.id}`, volunteer);
}

async function _addVolunteer(volunteer) {
  return httpService.post(`${BASE_URL}`, volunteer);
}
