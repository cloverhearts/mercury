import ACTION_TYPES from "./types";

export default {
  [ACTION_TYPES.NEW_NOTE]: async function(title) {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      return { error: "createNote", message: "cannot found mercury note manager" };
    }
    const Manager = window._mercury.system["NoteManager"]();
    const note = await Manager.create({ title });
    return note;
  },
  [ACTION_TYPES.LOAD_NOTE]: async function(noteId) {
    if (!(window && window._mercury && window._mercury.system["NoteManager"])) {
      return { error: "loadNote", message: "cannot found mercury note manager" };
    }
    const Manager = window._mercury.system["NoteManager"]();
    const note = await Manager.load({ noteId });
    return note;
  },
  [ACTION_TYPES.SET_CURRENT_NOTE]: async function(note) {
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_NOTE,
      note: note
    });
  }
};
