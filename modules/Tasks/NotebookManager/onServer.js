const meta = require('./meta');
const Save = require('./Actions/Note/Save');

// { container: {}, noteId: 'noteid', type: 'save' }
async function onServer(request) {
  try {
    const {type, noteId, container} = request;
    let result = {};

    console.log('Notebook manager ', request);
    switch (type) {
      case 'save':
        result = await Save(noteId, container);
        break;
      default:
        throw Error(`Unknown type ${type}`)
    }
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {meta, onServer};
