import ACTION_TYPES from "./types";
import initializeState from "./state";

function managementForNote(state = initializeState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_NOTE:
      const newState = { ...state };
      newState.notes.current = { ...action.note };
      return newState;
    default:
      return state;
  }
}

export default managementForNote;
