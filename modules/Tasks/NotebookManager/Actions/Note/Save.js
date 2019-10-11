const UUID = require("uuid/v4");
const Database = require("../../Database/UserDatabase");
const fixedUser = "Anonymous";
const Container = require("mercury-core").default.Code.Container;
let db = null;
module.exports = async (noteId, container, { noteTitle }) => {
  if (!db) {
    db = await Database();
  }
  if (!db) {
    console.error(`Error: unknown database, ${noteId}`);
    return `Error: unknown database, ${noteId}`;
  }
  let containerId = null;
  try {
    const note = await db
      .get(`${fixedUser}.notes`)
      .find({ id: noteId })
      .value();
    if (note) {
      const containers = await db
        .get(`${fixedUser}.notes`)
        .find({ id: noteId })
        .get("containers");
      const newContainer = new Container(container);
      const existsContainer = containers.find({ id: newContainer.id }).value();
      if (existsContainer) {
        await containers
          .find({ id: newContainer.id })
          .assign(newContainer)
          .write();
        containerId = newContainer.id;
      } else {
        await containers.push(newContainer.toSerialize()).write();
        containerId = newContainer.id;
      }
    } else {
      const newContainer = new Container(container);
      newContainer.meta.assignCreatedAt();
      newContainer.meta.assignUpdatedAt();
      newContainer.meta.owner = `${fixedUser}`;
      const newNote = {
        id: noteId || UUID(),
        title: `${noteTitle ? noteTitle : `NEW Note ${newContainer.meta.createdAt}`}`,
        containers: [newContainer.toSerialize()]
      };
      await db
        .get(`${fixedUser}.notes`)
        .push(newNote)
        .write();

      const newNoteMeta = { id: newNote.id, title: newNote.title };
      console.log("load ", newNoteMeta);
      await db
        .get(`${fixedUser}.meta.order.notes`)
        .push(newNoteMeta)
        .write();
      console.log("end");
      containerId = newContainer.id;
    }
    return await db
      .get(`${fixedUser}.notes`)
      .find({ id: noteId })
      .get("containers")
      .find({ id: containerId })
      .value();
  } catch (error) {
    console.log("ERROR ", error);
    return error;
  }
};