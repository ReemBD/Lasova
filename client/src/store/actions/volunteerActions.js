// temporary service to mimic server-DB requests 
import { storageService } from '../../services/async-storage.service';
const STORAGE_KEY = 'volunteers';
// TEMPORARY IIFE to load volunteers from mock_data.json to localStorage
(function loadMockToStorage() {
  if (!JSON.parse(localStorage.getItem(STORAGE_KEY))) {
    const mockData = require("../../services/mock-data.json")
    localStorage[STORAGE_KEY] = JSON.stringify(mockData);
  }
})();

// serverService will be used to make requests to server:
// import { serverService } from "../../services/client-server.service"


/*******************************************************************************************/

export function loadVolunteers() {
  return async (dispatch) => {
    try {
      const volunteers = await storageService.query(STORAGE_KEY);
      // const volunteers = await serverService.get('volunteers')
      dispatch({ type: 'LOAD_VOLUNTEERS', volunteers });
    } catch (err) {
      console.log("Error loading volunteers:");
      console.error(err);
    }
  }
}

export function saveVolunteer(volunteerToSave) {
  return async (dispatch) => {
    try {
      const type = volunteerToSave.id ? "UPDATE_VOLUNTEER" : "ADD_VOLUNTEER";
      
      if (volunteerToSave.id) {
        await storageService.put(STORAGE_KEY, volunteerToSave);
      } else {
        volunteerToSave = await storageService.post(STORAGE_KEY, volunteerToSave);
      }
      dispatch({ type, volunteer: volunteerToSave });
    } catch (err) {
      console.log("error saving volunteer", volunteerToSave);
      console.error(err);
    }
  }
}

export function removeVolunteer(volunteerId) {
  return async (dispatch) => {
    try {
      await storageService.remove(STORAGE_KEY, volunteerId);
      dispatch({ type: "REMOVE_VOLUNTEER", volunteerId });
    } catch (err) {
      console.log("error removing volunteer with ID:", volunteerId);
      console.error(err);
    }
  }
}

export function setFilter(newFilters) {
  return (dispatch, getState) => {
    const { volunteers } = getState().volunteerReducer;
    const filteredVolunteers = volunteers; //volunteers.filter.....
    dispatch({ type: "SET_AND_FILTER", newFilters, filteredVolunteers });
  }
}