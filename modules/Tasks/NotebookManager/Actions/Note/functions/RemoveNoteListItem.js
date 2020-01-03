const moment = require("moment");
module.exports = async function AppendNoteInList({
  db,
  user,
  noteId,
  deletedAt
}) {
  db.read();
  await db
    .get(`${user}.meta.order.notes`)
    .find({ id: noteId })
    .assign({ deletedAt: deletedAt || moment().utc().toISOString()})
    .write();
  return await db.get(`${user}.meta.order.notes`).value();
};
