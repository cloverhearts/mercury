const UUID = require("uuid/v4");
const Database = require("../../Database/UserDatabase");
const AppendNoteInList = require("./functions/InsertNoteListItem");
const fixedUser = "Anonymous";

let db = null;
module.exports = async (targetNote) => {
  if (!db) {
    db = await Database();
  }
  if (!db) {
    console.error(`Error: unknown database, create note`);
    return `Error: unknown database`;
  }
  try {
    db.read();
    targetNote.id = `note-${UUID()}`;
    await db
      .get(`${fixedUser}.notes`)
      .push(targetNote)
      .write();

    await AppendNoteInList({
      db,
      user: fixedUser,
      noteId: targetNote.id,
      noteTitle: targetNote.title || `Imported note`,
      noteDescription: targetNote.description || ''
    });

    return await db
      .get(`${fixedUser}.notes`)
      .find({ id: targetNote.id })
      .value();
  } catch (error) {
    console.error(error);
    return error;
  }
};
