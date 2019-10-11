const jsdom = require("jsdom");
const NoteManager = require("./modules/client/libraries/NoteManager");
const Fetch = require("./modules/client/libraries/Fetch");

window._mercury = {
  utils: {
    jsdom
  }
};

// import fetch
window._mercury.utils["Fetch"] = Fetch;
window._mercury.utils["NoteManager"] = NoteManager;
