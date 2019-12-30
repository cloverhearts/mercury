const Database = require("../../Database/UserDatabase");
const fixedUser = "Anonymous";
const AppendNoteInList = require("./functions/InsertNoteListItem");
let db = null;
module.exports = async note => {
  if (!db) {
    db = await Database();
  }
  if (!db) {
    console.error(`Error: unknown database, ${note.id}`);
    return `Error: unknown database, ${note.id}`;
  }
  try {
    db.read();
    if (!note && !note.id) {
      throw Error("cannot save note, does not exists note id");
    }
    const noteId = note.id;
    const originalNote = await db
      .get(`${fixedUser}.notes`)
      .find({ id: noteId })
      .value();

    if (!originalNote) {
      throw Error("cannot found original note by id ", note.id);
    }

    const savedNote = await db
      .get(`${fixedUser}.notes`)
      .find({ id: noteId })
      .assign(note)
      .write();

    await AppendNoteInList({ db, user: fixedUser, noteId: savedNote.id, noteTitle: savedNote.title, noteDescription: savedNote.description });

    return savedNote;
  } catch (error) {
    console.log("ERROR ", error);
    return error;
  }
};
