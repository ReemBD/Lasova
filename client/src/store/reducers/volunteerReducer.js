const initialState = {
  volunteers: null,
  volunteersToShow: null,
  // filters: {
  /*
      search: '',
      status: [''], 
      volunteerMisgeret: [''],
      referringMisgeret: ['']
  */
  // },
};

export function volunteerReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_VOLUNTEERS":
      return {
        ...state,
        volunteers: action.volunteers,
        volunteersToShow: action.volunteers,
      };
    case "ADD_VOLUNTEER":
      return {
        ...state,
        volunteers: [action.volunteer, ...state.volunteers],
        volunteersToShow: [action.volunteer, ...state.volunteersToShow],
      };
    case "REMOVE_VOLUNTEER":
      return {
        ...state,
        volunteers: state.volunteers.filter(
          (volunteer) => volunteer._id !== action.volunteerId
        ),
      };
    case "UPDATE_VOLUNTEER":
      return {
        ...state,
        volunteers: state.volunteers.map((volunteer) =>
          volunteer._id === action.volunteer._id ? action.volunteer : volunteer
        ),
      };
    case "SEARCH_VOLUNTEERS":
      return {
        ...state,
        volunteersToShow: action.filteredVolunteers,
      };

    case "SET_AND_FILTER":
      return {
        ...state,
        volunteersToShow: action.filteredVolunteers,
      };
    default:
      return state;
  }
}
