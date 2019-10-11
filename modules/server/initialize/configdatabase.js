const path = require("path");
const configDatabasePath = path.join(__dirname, "../../../database/config.json");
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
