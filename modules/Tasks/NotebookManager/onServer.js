const meta = require("./meta");
const Create = require("./Actions/Note/Create");
const Save = require("./Actions/Note/Save");
const Load = require("./Actions/Note/Load");
const ListNote = require("./Actions/Note/List");

// { container: {}, noteId: 'noteid', type: 'save' }
async function onServer(request) {
  try {
    const { type, noteId } = request;
    let result = {};

    console.log("Notebook manager ", request);
    switch (type) {
      case "list.note":
        result = await ListNote();
        break;
      case "load.note":
        result = await Load(noteId);
        break;
      case "create.note":
        const title = request.title || undefined;
        const description = request.description || "";
        result = await Create({ title, description });
        break;
      case "save.note":
        result = await Save(request.note);
        break;
      case "export.note":
        result = await Load(noteId);
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
