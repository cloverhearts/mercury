const path = require('path');
const configDatabasePath = path.join(__dirname,
  '../../../database/config.json');
const database = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(configDatabasePath);
const configDatabase = database(adapter);
const initialize = () => {
  console.log('config database');
  configDatabase.defaults(
    {
      _mercury: {
        config: {}
      }
    }
  ).write()

  console.log(configDatabase.get('_mercury.config').value())
  console.log(configDatabase.get('_mercury.config.hoho').value())

};

module.exports = initialize;