const initialState = {
  volunteers: [], // all volunteers
  filteredVolunteers: null, // if filtering or searching
  currVolunteer: null, // in volunteer profile page
};

export function volunteerReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_VOLUNTEERS":
      return {
        ...state,
        volunteers: action.volunteers,
      }
    case "SET_CURR_VOLUNTEER":
      const volunteer = !action.volunteerId ? null :
        state.volunteers.find(volunteer => volunteer.id === action.volunteerId);
      return {
        ...state,
        currVolunteer: volunteer,
      }
    case "ADD_VOLUNTEER":
      return {
        ...state,
        volunteers: [...state.volunteers, action.volunteer],
      }
    case "REMOVE_VOLUNTEER":
      return {
        ...state,
        volunteers: state.volunteers.filter(
          (volunteer) => volunteer.id !== action.volunteerId
        ),
      }
    case "UPDATE_VOLUNTEER":
      return {
        ...state,
        volunteers: state.volunteers.map((volunteer) =>
          volunteer.id === action.volunteer.id ? action.volunteer : volunteer
        ),
      }
    case "SET_FILTERED_VOLUNTEERS":
      return {
        ...state,
        filteredVolunteers: action.filteredVolunteers,
      }
    default:
      return state
  }
}
