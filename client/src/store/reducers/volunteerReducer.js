const initialState = {
  allVolunteers: [],
  filteredVolunteers: [],
  filters: {
    /*
      search: '',
      status: [''], 
      volunteerMisgeret: [''],
      referringMisgeret: ['']
  */
  },
};

export function volunteerReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_VOLUNTEERS":
      return {
        ...state,
        allVolunteers: action.payload,
        filteredVolunteers: action.payload,
      };
    case "SEARCH_VOLUNTEERS":
      return {
        ...state,
        filteredVolunteers: action.payload,
      };
    case "ADD_VOLUNTEER":
      return {
        ...state,
        filteredVolunteers: [...state.filteredVolunteers, action.payload],
      };
    case "REMOVE_VOLUNTEER":
      return {
        ...state,
        volunteers: state.volunteers.filter(
          (volunteer) => volunteer.id !== action.volunteerId
        ),
      };
    case "UPDATE_VOLUNTEER":
      return {
        ...state,
        volunteers: state.volunteers.map((volunteer) =>
          volunteer.id === action.volunteer.id ? action.volunteer : volunteer
        ),
      };
    case "FILTER_VOLUNTEERS":
      return {
        ...state,
        filters: action.newFilters,
        filteredVolunteers: action.filteredVolunteers,
      };
    default:
      return state;
  }
}
