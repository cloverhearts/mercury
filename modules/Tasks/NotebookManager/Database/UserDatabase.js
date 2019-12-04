const path = require("path");
const app = require("electron").app;
const basepath = process.env.MERCURY_ENV === "development" ? app.getAppPath() : process.resourcesPath;
const database = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const initialize = (userId, configPath) => {
  const configDatabasePath = configPath;
  const adapter = new FileSync(configDatabasePath);
  const configDatabase = database(adapter);
  const defaultObject = {};
  defaultObject[userId] = {};
  defaultObject[userId]["_mercury"] = { config: {} };
  defaultObject[userId]["notes"] = [];
  configDatabase.defaults(defaultObject).write();
  return configDatabase;
};
module.exports = async (userId, configPath) => {
  return initialize("Anonymous", path.join(basepath, "database", "anonymous.json"));
};
