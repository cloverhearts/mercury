const initializeTaskListener = require('./initialize/taskListener');
const initializeConfigDatabase = require('./initialize/configdatabase');
const initialize = () => {
  initializeConfigDatabase();
  initializeTaskListener();
};

module.exports = {initializeServer: initialize};
