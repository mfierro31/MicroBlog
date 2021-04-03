const INITIAL_STATE = false;

function editReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case "TOGGLE_EDIT":
      return !state;
    default:
      return state;
  }
}

export default editReducer;