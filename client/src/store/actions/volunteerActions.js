// temporary service to mimic server-DB requests 
// uses localStorage as DB, final app will not use localStorage..
import { storageService } from '../../services/async-storage.service';
const STORAGE_KEY = 'volunteers';

// serverService will be used to make requests to server:
// import { serverService } from "../../services/client-server.service"

export function loadVolunteers() {
  return async (dispatch) => {
    try {
      // ask "server" for all volunteers data:
      const volunteers = await storageService.query(STORAGE_KEY);
      // const volunteers = await serverService.get('volunteers')
      dispatch({ type: 'SET_VOLUNTEERS', volunteers });
    } catch (err) {
      console.log("Error loading volunteers:");
      console.dir(err);
    }
  }
}

export function getVolunteer(volunteerId) {
  return { type: "SET_CURR_VOLUNTEER", volunteerId }
}

export function clearVolunteer() {
  return { type: "SET_CURR_VOLUNTEER", volunteerId: null }
}

export function saveVolunteer(volunteerToSave) {
  return async (dispatch) => {
    try {
      // if the colunteer has id - it already exists in DB = update action
      // no id? send new volunteer to server
      // both cases- server returns the updated item
      const type = volunteerToSave.id ? "UPDATE_VOLUNTEER" : "ADD_VOLUNTEER";
      
      if (volunteerToSave.id) {
        volunteerToSave = await storageService.put(STORAGE_KEY, volunteerToSave);
      } else await storageService.post(STORAGE_KEY, volunteerToSave);
      
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
export function filterVolunteers(queryParams) {
  return (dispatch, getState) => {
    if (_isQueryEmpty(queryParams)) {
      // no search string or filter=> 
      // state.filteredVolunteers will be set to null in reducer =>
      // VT component will render the volunteers array
      dispatch({ type: "SET_FILTERED_VOLUNTEERS", filteredVolunteers: null });
    } else {
      // extract volunteers from state
      const { volunteers } = getState().volunteerReducer;
      const filteredVolunteers = []; // do some filtering actions here.....
      dispatch({ type: "SET_FILTERED_VOLUNTEERS", filteredVolunteers });
    }
  }
}

// internal module function - name starts with _ by convention
// checks if VT header input is empty (no search string or filter)
function _isQueryEmpty(query) {
  return !Object.keys(query.filterBy).length && !query.search;
}

// queryParams= {
// search: 'volunteer name',
// filterBy: {group: 'group_name', groupManager: 'manager name', etc...}
// }