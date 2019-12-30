const Database = require("../../Database/UserDatabase");
const moment = require("moment");
const fixedUser = "Anonymous";
const RemoveNoteInList = require('./functions/RemoveNoteListItem');

let db = null;
module.exports = async noteId => {
  if (!db) {
    db = await Database();
  }
  if (!db) {
    console.error(`Error: unknown database, ${noteId}`);
    return `Error: unknown database, ${noteId}`;
  }
  try {
    db.read();
    const deletedAt = moment()
      .utc()
      .toISOString()
    await db
      .get(`${fixedUser}.notes`)
      .find({ id: noteId })
      .assign({ deletedAt })
      .write();

    await RemoveNoteInList({
      db,
      user: fixedUser,
      noteId,
      deletedAt
    });

    return { isSuccess: true };
  } catch (error) {
    console.error("ERROR ", error);
    return error;
  }
};
