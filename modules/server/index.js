const path = require("path");
const app = require("electron").app;
const basepath = process.env.MERCURY_ENV === "development" ? app.getAppPath() : process.resourcesPath;
const initializeTaskListener = require("./initialize/taskListener");
const initializeConfigDatabase = require("./initialize/configdatabase");
const initalizeUserDatabase = require("./initialize/userDatabase");
const initialize = () => {
  initializeConfigDatabase();
  // TODO(cloverhearts): need to implement account system in future.
  initalizeUserDatabase("Anonymous", path.join(basepath, "database", `anonymous.json`));
  initializeTaskListener();
};

module.exports = { initializeServer: initialize };
