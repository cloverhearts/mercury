const initializeTaskListener = require("./initialize/taskListener");
const initializeConfigDatabase = require("./initialize/configdatabase");
const initalizeUserDatabase = require("./initialize/userDatabase");
const initialize = () => {
  initializeConfigDatabase();
  // TODO(cloverhearts): need to implement account system in future.
  initalizeUserDatabase("Anonymous", "../../../database/anonymous.json");
  initializeTaskListener();
};

module.exports = { initializeServer: initialize };
