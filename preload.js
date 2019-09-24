const jsdom = require('jsdom');
const fetch = require('./modules/Tasks/RemoteAjax');

window._mercury = {
  utils: {
    jsdom,
  },
};

// import fetch
window._mercury.utils[fetch.meta.type] = fetch.task;
