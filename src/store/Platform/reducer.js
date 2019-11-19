import ACTION_TYPES from "./types";
import initializeState from "./state";

function reducer(_state = initializeState, action) {
  const state = { ..._state };
  switch (action.type) {
    case ACTION_TYPES.RESPONSE_OPEN_CREATE_NEW_NOTE_DIALOG:
      state.note.dialog.createNewNote.isOpen = true;
      if (action.note) {
        state.note.dialog.createNewNote.default.title = action.note.title;
      }
      return state;
    case ACTION_TYPES.RESPONSE_CLOSE_CREATE_NEW_NOTE_DIALOG:
      state.note.dialog.createNewNote.isOpen = false;
      return state;
    default:
      return state;
  }
}

export default reducer;
