const fs = require("fs");
const path = require("path");
const app = require("electron").app;
const basepath = process.env.MERCURY_ENV === "development" ? app.getAppPath() : process.resourcesPath;
const initializeTaskListener = require("./initialize/taskListener");
const initializeConfigDatabase = require("./initialize/configdatabase");
const initializeUserDatabase = require("./initialize/userDatabase");
const initializeTutorialNotes = require('./initialize/importTutorialNotes');
const initialize = () => {
  initializeConfigDatabase();
  // TODO(cloverhearts): need to implement account system in future.
  if (!fs.existsSync(path.join(basepath, "database", `anonymous.json`))) {
    initializeUserDatabase("Anonymous", path.join(basepath, "database", `anonymous.json`));
    initializeTutorialNotes();
  }
  initializeTaskListener();
};

module.exports = { initializeServer: initialize };
