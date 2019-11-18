import ACTION_TYPES from "./types";
import initializeState from "./state";

function reducer(_state = initializeState, action) {
  const state = { ..._state };
  switch (action.type) {
    case ACTION_TYPES.REQUEST_OPEN_CREATE_NEW_NOTE_DIALOG:
      return state;
    case ACTION_TYPES.RESPONSE_OPEN_CREATE_NEW_NOTE_DIALOG:
      return state;
    default:
      return state;
  }
}

export default reducer;
