const meta = require("./meta");
const Save = require("./Actions/Note/Save");
const Load = require("./Actions/Note/Load");

// { container: {}, noteId: 'noteid', type: 'save' }
async function onServer(request) {
  try {
    const { type, noteId, container } = request;
    let result = {};

    console.log("Notebook manager ", request);
    switch (type) {
      case "get.list":
        break;
      case "load.note":
        result = await Load(noteId);
        break;
      case "save.note":
        result = await Save(noteId, container);
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
