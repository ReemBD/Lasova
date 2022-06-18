const initialState = {
    groups: [],
    groupsToShow: null,
  };
  
  export function groupReducer(state = initialState, action) {
    switch (action.type) {
      case "LOAD_GROUPS":
        return {
          ...state,
          groups: action.groups,
          groupsToShow: action.groups,
        };
      case "ADD_GROUP":
        return {
          ...state,
          groups: [action.group, ...state.groups],
          groupsToShow: [action.group, ...state.groupsToShow],
        };
      case "REMOVE_GROUP":
        return {
          ...state,
          groups: state.groups.filter(
            (group) => group._id !== action.groupId
          ),
        };
      case "UPDATE_GROUP":
        return {
          ...state,
          groups: state.groups.map((group) =>
          group._id === action.group._id ? action.group : group
          ),
        };
      case "SEARCH_GROUPS":
        return {
          ...state,
          groupsToShow: action.filteredGroups,
        };
  
      case "SET_AND_FILTER":
        return {
          ...state,
          groupsToShow: action.filteredGroups,
        };
      default:
        return state;
    }
  }
  