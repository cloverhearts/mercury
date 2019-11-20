const UUID = require("uuid/v4");
const moment = require("moment");
const Database = require("../../Database/UserDatabase");
const AppendNoteInList = require("./functions/InsertNoteListItem");
const fixedUser = "Anonymous";
const NoteContainer = require("mercury-core").default.NoteContainer.Note;
const Paragraph = require("mercury-core").default.ParagraphContainer.Paragraph;

// TODO(cloverhearts): NEED TO IMPLEMENT
let db = null;
module.exports = async ({
  title: noteTitle = `New Note ${moment()
    .utc()
    .toISOString()}`,
  description = ""
}) => {
  if (!db) {
    db = await Database();
  }
  if (!db) {
    console.error(`Error: unknown database, create note`);
    return `Error: unknown database`;
  }
  try {
    db.read();
    const noteId = `note-${UUID()}`;
    const newNote = new NoteContainer({
      title: noteTitle,
      id: noteId,
      paragraphs: [new Paragraph({ parentId: noteId, content: [{ insert: `You can write here!` }] })]
    });
    await db
      .get(`${fixedUser}.notes`)
      .push(newNote.toSerialize())
      .write();

    await AppendNoteInList({
      db,
      user: fixedUser,
      noteId: newNote.id,
      noteTitle: newNote.title,
      noteDescription: description
    });

    return await db
      .get(`${fixedUser}.notes`)
      .find({ id: noteId })
      .value();
  } catch (error) {
    console.error(error);
    return error;
  }
};
