const UUID = require("uuid/v4");
const Database = require("../../Database/UserDatabase");
const fixedUser = "Anonymous";
const Container = require("mercury-core").default.Code.Container;
let db = null;
module.exports = async note => {
  if (!db) {
    db = await Database();
  }
  if (!db) {
    console.error(`Error: unknown database, ${noteId}`);
    return `Error: unknown database, ${noteId}`;
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

    console.log(savedNote);

    return savedNote;
  } catch (error) {
    console.log("ERROR ", error);
    return error;
  }
};
