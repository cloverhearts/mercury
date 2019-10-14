const path = require("path");
const app = require("electron").app;
const basepath = process.env.MERCURY_ENV === "development" ? app.getAppPath() : process.resourcesPath;
const configDatabasePath = path.join(basepath, "database", `config.json`);
const database = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(configDatabasePath);
const configDatabase = database(adapter);
const initialize = () => {
  console.log("setup config database");
  configDatabase
    .defaults({
      _mercury: {
        config: {}
      }
    })
    .write();
  return configDatabase;
};

module.exports = initialize;
