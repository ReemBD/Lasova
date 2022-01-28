// temporarily works with localStorage service,
// later replaced with axios requests to server
import { storageService } from "./async-storage.service"
const STORAGE_KEY = "volunteers"

export const volunteerService = {
  query,
  getById,
  save,
  remove,
  filter,
};

(function loadMockToStorage() {
  if (!JSON.parse(localStorage.getItem(STORAGE_KEY))) {
    const mockData = require("./mock-data.json")
    localStorage[STORAGE_KEY] = JSON.stringify(mockData)
  }
})()

function query() {
  try {
    return storageService.query(STORAGE_KEY)
  } catch (err) {
    throw err
  }
}
// we need to consider scalability - if many (MANY) volunteers (unlikely?)
// server+DB should do paging, filtering, searching...?
// query(pageIdx, itemsPerPage, filterBy = {})


function getById(volunteerId) {
  try {
    return storageService.get(STORAGE_KEY, volunteerId)
  } catch (err) {
    throw err
  }
}

function remove(volunteerId) {
  try {
    storageService.remove(STORAGE_KEY, volunteerId)
    return Promise.resolve()
  } catch (err) {
    throw err
  }
}

function save(volunteer) {
  try {
    if (volunteer.id) {
      return storageService.put(STORAGE_KEY, volunteer)
    } else {
      return storageService.post(STORAGE_KEY, volunteer)
    }
  } catch (err) {
    throw err
  }
}

function filter(volunteers, queryParams) {
  let filteredVolunteers = []

  if (Object.keys(queryParams.filterBy).length) {
    // do some filtering
    // filteredVolunteers = volunteers.filter(...)
  } else filteredVolunteers = [...volunteers]

  if (queryParams.search) {
    // do some search on filteredVolunteers...
  }

  return filteredVolunteers
}