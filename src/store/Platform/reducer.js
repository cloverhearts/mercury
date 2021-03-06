import ACTION_TYPES from "./types";
import initializeState from "./state";

function reducer(_state = initializeState, action) {
  const state = { ..._state };
  switch (action.type) {
    case ACTION_TYPES.RESPONSE_OPEN_CREATE_NEW_NOTE_DIALOG:
      if (action.note) {
        state.note.dialog.createNewNote.default.title = action.note.title;
      }
      state.note.dialog.createNewNote.isOpen = true;
      return state;
    case ACTION_TYPES.RESPONSE_CLOSE_CREATE_NEW_NOTE_DIALOG:
      state.note.dialog.createNewNote.isOpen = false;
      return state;
    case ACTION_TYPES.RESPONSE_OPEN_REMOVE_NOTE_DIALOG:
      state.note.dialog.removeNote.isOpen = true;
      return state;
    case ACTION_TYPES.RESPONSE_CLOSE_REMOVE_NOTE_DIALOG:
      state.note.dialog.removeNote.isOpen = false;
      return state;
    case ACTION_TYPES.RESPONSE_OPEN_EXPORT_NOTE_DIALOG:
      if (action.note) {
        state.note.dialog.exportNote.target.id = action.note.id;
      }
      state.note.dialog.exportNote.isOpen = true;
      return state;
    case ACTION_TYPES.RESPONSE_CLOSE_EXPORT_NOTE_DIALOG:
      state.note.dialog.exportNote.isOpen = false;
      state.note.dialog.exportNote.target = {};
      return state;
    case ACTION_TYPES.RESPONSE_OPEN_IMPORT_NOTE_DIALOG:
      state.note.dialog.importNote.isOpen = true;
      return state;
    case ACTION_TYPES.RESPONSE_CLOSE_IMPORT_NOTE_DIALOG:
      state.note.dialog.importNote.isOpen = false;
      return state;
    case ACTION_TYPES.RESPONSE_OPEN_NOTE_CONFIG_DIALOG:
      state.note.dialog.configNote.isOpen = true;
      return state;
    case ACTION_TYPES.RESPONSE_CLOSE_NOTE_CONFIG_DIALOG:
      state.note.dialog.configNote.isOpen = false;
      return state;
    case ACTION_TYPES.RESPONSE_SET_MISSING_SAVE_NOTE:
      state.note.dialog.missingSaveNote.targetNote = action.note;
      return state;
    default:
      return state;
  }
}

export default reducer;
