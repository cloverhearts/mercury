const prompt = require('electron-prompt');
const jsdom = require('jsdom');
const NoteManager = require('./modules/client/libraries/NoteManager');
const Fetch = require('./modules/client/libraries/Fetch');
const exec = require('./modules/client/libraries/exec');
const npmModule = require('./modules/client/libraries/RequireModule');
const lodash = require('lodash');
const fixPath = require('fix-path');
fixPath();

window.prompt = prompt;

window._ = lodash

window._mercury = {
  utils: {
    lodash: lodash,
    jsdom,
    npmModule,
    exec
  },
  system: {},
  appRender: {}
};

// import fetch
window._mercury.utils['Fetch'] = Fetch;
window._mercury.utils['NoteManager'] = NoteManager;
window._mercury.system['NoteManager'] = NoteManager;
