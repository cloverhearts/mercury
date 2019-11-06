const UUID = require("uuid/v4");
const moment = require("moment");
const Database = require("../../Database/UserDatabase");
const fixedUser = "Anonymous";
const NoteContainer = require("mercury-core").default.NoteContainer.Note;
const Paragraph = require("mercury-core").default.ParagraphContainer.Paragraph;
// TODO(cloverhearts): NEED TO IMPLEMENT
let db = null;
module.exports = async (
  noteTitle = `New Note ${moment()
    .utc()
    .toISOString()}`
) => {
  if (!db) {
    db = await Database();
  }
  if (!db) {
    console.error(`Error: unknown database, create note`);
    return `Error: unknown database`;
  }

  try {
    const noteId = `note-${UUID()}`;
    const newNote = new NoteContainer({
      title: noteTitle,
      id: noteId,
      paragraphs: [new Paragraph({ parentId: noteId, content: `You can write here!` })]
    });
    await db
      .get(`${fixedUser}.notes`)
      .push(newNote.toSerialize())
      .write();
    return await db
      .get(`${fixedUser}.notes`)
      .find({ id: noteId })
      .value();
  } catch (error) {
    return error;
  }
};