const initialState = {
  volunteers: [],
  volunteersToShow: null,
  filters: {/*
      search: '',
      status: [''], 
      volunteerMisgeret: [''],
      referringMisgeret: ['']
  */},
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
				volunteers: [...state.volunteers, action.volunteer],
			};
		case "REMOVE_VOLUNTEER":
			return {
				...state,
				volunteers: state.volunteers.filter(
					volunteer => volunteer.id !== action.volunteerId
				),
			};
		case "UPDATE_VOLUNTEER":
			return {
				...state,
				volunteers: state.volunteers.map(volunteer =>
					volunteer.id === action.volunteer.id ? action.volunteer : volunteer
				),
			};
		case "SET_AND_FILTER":
			return {
				...state,
				filters: action.newFilters,
				volunteersToShow: action.filteredVolunteers,
			};
		default:
			return state;
  }
}