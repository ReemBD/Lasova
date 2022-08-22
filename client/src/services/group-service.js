import { httpService } from './http-service';

export const groupService = {
  saveGroup,
  query,
  removeGroup,
  removeManyGroups,
};

const BASE_URL = 'group';

function query({} = {}) {
  return httpService.get(`${BASE_URL}`);
}

function saveGroup(group) {
  return group._id ? _updateGroup(group) : _addGroup(group);
}

function removeManyGroups(ids) {
  const queryString = new URLSearchParams({ ids });
  return httpService.delete(`${BASE_URL}?${queryString}`);
}

function removeGroup(id) {
  return httpService.delete(`${BASE_URL}/${id}`);
}

function _updateGroup(group) {
  return httpService.put(`${BASE_URL}/${group._id}`, group);
}

function _addGroup(group) {
  return httpService.post(`${BASE_URL}`, group);
}
