const jsdom = require('jsdom');
const notebookManager = require('./modules/Tasks/NotebookManager');
const fetch = require('./modules/Tasks/RemoteAjax');

window._mercury = {
  utils: {
    jsdom,
  },
};

// import fetch
window._mercury.utils[fetch.meta.type] = fetch.task;
window._mercury.utils[notebookManager.meta.type] = notebookManager.task;
