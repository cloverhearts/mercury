const jsdom = require("jsdom");
const NoteManager = require("./modules/client/libraries/NoteManager");
const Fetch = require("./modules/client/libraries/Fetch");

window._mercury = {
  utils: {
    jsdom
  },
  system: {}
};

// import fetch
window._mercury.utils["Fetch"] = Fetch;
window._mercury.utils["NoteManager"] = NoteManager;
window._mercury.system["NoteManager"] = NoteManager;
