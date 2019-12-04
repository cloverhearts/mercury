const prompt = require('electron-prompt')
const jsdom = require("jsdom");
const NoteManager = require("./modules/client/libraries/NoteManager");
const Fetch = require("./modules/client/libraries/Fetch");

window.prompt = prompt

window._mercury = {
  utils: {
    jsdom
  },
  system: {},
  appRender: {}
};

// import fetch
window._mercury.utils["Fetch"] = Fetch;
window._mercury.utils["NoteManager"] = NoteManager;
window._mercury.system["NoteManager"] = NoteManager;
