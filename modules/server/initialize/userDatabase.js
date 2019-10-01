const path = require("path");
const database = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const initialize = (userId, configPath) => {
  const configDatabasePath = path.join(__dirname, configPath);
  const adapter = new FileSync(configDatabasePath);
  const configDatabase = database(adapter);
  const defaultObject = {};
  defaultObject[userId] = {};
  defaultObject[userId]["_mercury"] = { config: {} };
  defaultObject[userId]["notebook"] = [];
  configDatabase.defaults(defaultObject).write();
  return configDatabase;
};

module.exports = initialize;
