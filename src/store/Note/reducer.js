import ACTION_TYPES from "./types";
import initializeState from "./state";
import MercuryCore from "mercury-core";
import {exportNote} from "./actions";

const Note = MercuryCore.NoteContainer.Note;

function managementForNote(_state = initializeState, action) {
  const state = {..._state};
  switch (action.type) {
    case ACTION_TYPES.RESPONSE_NEW_NOTE:
      return state;
    case ACTION_TYPES.RESPONSE_LOAD_NOTE:
      state.current.note = new Note(action.note);
      return state;
    case ACTION_TYPES.RESPONSE_SAVE_NOTE:
      state.current.suggestForSaveNote = false;
      state.current.note.title = action.note.title
      state.current.note.description = action.note.description
      return state;
    case ACTION_TYPES.RESPONSE_REMOVE_NOTE:
      return state;
    case ACTION_TYPES.RESPONSE_NOTE_LIST:
      state.list.notes = [...action.list];
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
    case ACTION_TYPES.RESPONSE_EXPORT_NOTE:
      state.current.exportNote = new Note(action.note)
      return state;
    case ACTION_TYPES.CLEAR_EXPORT_NOTE:
      state.current.exportNote = {};
      return state;
    case ACTION_TYPES.RESPONSE_IMPORT_NOTE:
      state.current.note = new Note(action.note);
      return state;
    case ACTION_TYPES.RESPONSE_EXECUTE_CODE_CONTAINER:
      return state;
    default:
      return state;
  }
}

export default managementForNote;
