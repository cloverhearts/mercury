import ACTION_TYPES from "./types";
import initializeState from "./state";

function managementForNote(_state = initializeState, action) {
  const state = { ..._state };
  switch (action.type) {
    case ACTION_TYPES.RESPONSE_NEW_NOTE:
      return state;
    case ACTION_TYPES.RESPONSE_LOAD_NOTE:
      state.current.note = action.note;
      return state;
    case ACTION_TYPES.RESPONSE_SAVE_NOTE:
      state.current.suggestForSaveNote = false;
      return state;
    case ACTION_TYPES.RESPONSE_REMOVE_NOTE:
      return state;
    case ACTION_TYPES.RESPONSE_NOTE_LIST:
      state.meta.notes = action.meta.notes;
      return state;
    case ACTION_TYPES.RESPONSE_MOVE_TO_NOTE_PAGE:
      return state;
    case ACTION_TYPES.REQUEST_UNSET_CURRENT_NOTE:
      state.current.note = {};
      state.current.suggestForSaveNote = false;
      return state;
    case ACTION_TYPES.REQUEST_SUGGEST_SAVE_NOTE:
      state.current.suggestForSaveNote = !!action.hasSuggestion;
      return state;
    default:
      return state;
  }
}

export default managementForNote;
