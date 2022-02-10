// temporary service to mimic server-DB requests 
// uses localStorage as DB, final app will not use localStorage..
import { storageService } from '../../services/async-storage.service';
const STORAGE_KEY = 'volunteers';
// TEMPORARY IIFE to load volunteers from mock_data.json to localStorage
// remove this when working with server+DB...
(function loadMockToStorage() {
  if (!JSON.parse(localStorage.getItem(STORAGE_KEY))) {
    const mockData = require("../../services/mock-data.json")
    localStorage[STORAGE_KEY] = JSON.stringify(mockData);
  }
})();

// serverService will be used to make requests to server:
// import { serverService } from "../../services/client-server.service"


/*******************************************************************************************/

// BEGINS HERE

export function loadVolunteers() {
  return async (dispatch) => {
    try {
      // ask "server" for all volunteers data:
      const volunteers = await storageService.query(STORAGE_KEY);
      // const volunteers = await serverService.get('volunteers')
      dispatch({ type: 'SET_VOLUNTEERS', payload: volunteers });
    } catch (err) {
      console.log("Error loading volunteers:");
      console.dir(err);
    }
  }
}

export function saveVolunteer(volunteerToSave) {
  return async (dispatch) => {
    try {
      // if the colunteer has id - it already exists in DB = update action
      // no id? send new volunteer to server
      // both cases- server returns the updated item
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



// queryParams from VT header: {search string, filter input}
export function filterVolunteers(newFilters) {
  return (dispatch, getState) => {
    const { allVolunteers } = getState().volunteerReducer;
    const filteredVolunteers = [];
    //TODO: filter allVolunteers based on newFilters
    dispatch({ type: "FILTER_VOLUNTEERS", newFilters, filteredVolunteers });
  }
}