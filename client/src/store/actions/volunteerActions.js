import { volunteerService } from "../../services/volunteer.service"

export function loadVolunteers() {
  return async (dispatch) => {
    try {
      const volunteers = await volunteerService.query()
      dispatch({ type: "SET_VOLUNTEERS", volunteers })
    } catch (err) {
      console.log("Error loading volunteers:")
      console.error(err)
    }
  }
}

export function getVolunteer(volunteerId) {
  return async (dispatch) => {
    try {
      const volunteer = await volunteerService.getById(volunteerId)
      dispatch({ type: "SET_CURR_VOLUNTEER", volunteer })
    } catch (err) {
      console.log("error getting volunteer with ID ", volunteerId, ":")
      console.error(err)
    }
  }
}

export function clearVolunteer() {
  return { type: "SET_CURR_VOLUNTEER", volunteer: null }
}

export function saveVolunteer(volunteerToSave) {
  return async (dispatch) => {
    try {
      const type = volunteerToSave.id ? "UPDATE_VOLUNTEER" : "ADD_VOLUNTEER";
      const savedVolunteer = await volunteerService.save(volunteerToSave);
      dispatch({ type, volunteer: savedVolunteer });
    } catch (err) {
      console.log("error saving volunteer", volunteerToSave)
      console.error(err)
    }
  }
}

export function removeVolunteer(volunteerId) {
  return async (dispatch) => {
    try {
      await volunteerService.remove(volunteerId)
      dispatch({ type: "REMOVE_VOLUNTEER", volunteerId })
    } catch (err) {
      console.log("error removing volunteer with ID:", volunteerId)
      console.error(err)
    }
  }
}

export function filterVolunteers(queryParams) {
  return (dispatch, getState) => {
    if (_isQueryEmpty(queryParams)) {
      dispatch({ type: "SET_FILTERED_VOLUNTEERS", filteredVolunteers: null })
    } else {
      const { volunteers } = getState().volunteerModule
      const filteredVolunteers = volunteerService.filter(
        volunteers,
        queryParams
      )
      dispatch({ type: "SET_FILTERED_VOLUNTEERS", filteredVolunteers })
    }
  }
}

function _isQueryEmpty(query) {
  return !Object.keys(query.filterBy).length && !query.search;
}