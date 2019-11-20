const moment = require("moment");
module.exports = async function AppendNoteInList({
  db,
  user,
  noteId,
  noteTitle,
  noteDescription = "",
  createdAt = moment()
    .utc()
    .toISOString(),
  fav = null,
  index = 0
}) {
  db.read();
  console.log("dddddddddd ", noteDescription);
  const list = await db.get(`${user}.meta.order.notes`).value();
  const noteMetaIndex = list.findIndex(meta => meta.id === noteId);
  if (noteMetaIndex >= 0) {
    list[noteMetaIndex].title = noteTitle;
    list[noteMetaIndex].description = noteDescription;
    if (fav !== null) {
      list[noteMetaIndex].fav = fav;
    }
  } else {
    list.splice(0, 0, {
      id: noteId,
      title: noteTitle,
      description: noteDescription,
      fav: fav !== null ? fav : false,
      createdAt: createdAt
    });
  }

  await db
    .get(`${user}.meta.order.notes`)
    .assign(list)
    .write();
  return await db.get(`${user}.meta.order.notes`).value();
};
