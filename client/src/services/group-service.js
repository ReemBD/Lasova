import {storageService} from './async-storage.service';
export const groupService = {
  saveGroup,
  query,
};

const BASE_URL = 'group';

function query({ isDefault, doReset } = {}) {
//   return httpService.get(`${BASE_URL}`);
  return storageService.query(`${BASE_URL}`);
}

function saveGroup(group) {
//   return group.id ? _updateGroup(group) : _addGroup(group);
  return group.id ? _updateGroup(group) : _addGroup(group);
}

function _updateGroup(group) {
//   return httpService.put(`${BASE_URL}/${group.id}`, group);
  return storageService.put(`${BASE_URL}/${group.id}`, group);
}

function _addGroup(group) {
//   return httpService.post(`${BASE_URL}`, group);
  return storageService.post(`${BASE_URL}`, group);
}