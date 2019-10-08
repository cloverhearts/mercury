const meta = require("./meta");
const Save = require("./Actions/Note/Save");
const Load = require("./Actions/Note/Load");
const ListNote = require("./Actions/Note/List");

// { container: {}, noteId: 'noteid', type: 'save' }
async function onServer(request) {
  try {
    const { type, noteId, container } = request;
    let meta = request.meta || {};
    let result = {};

    console.log("Notebook manager ", request);
    switch (type) {
      case "list.note":
        result = await ListNote();
        break;
      case "load.note":
        result = await Load(noteId);
        break;
      case "save.note":
        result = await Save(noteId, container, meta);
        break;
      default:
        throw Error(`Unknown command type ${type}`);
    }
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = { meta, onServer };
