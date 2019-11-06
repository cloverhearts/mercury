import ACTION_TYPES from "./types";
import initializeState from "./state";

function managementForNote(_state = initializeState, action) {
  const state = { ..._state };
  switch (action.type) {
    case ACTION_TYPES.RESPONSE_NEW_NOTE:
      console.log("res ", state, action);
      return state;
    case ACTION_TYPES.RESPONSE_LOAD_NOTE:
      return state;
    case ACTION_TYPES.RESPONSE_SAVE_NOTE:
      return state;
    case ACTION_TYPES.RESPONSE_REMOVE_NOTE:
      return state;
    case ACTION_TYPES.RESPONSE_MOVE_TO_NOTE_PAGE:
      return state;
    default:
      return state;
  }
}

export default managementForNote;
