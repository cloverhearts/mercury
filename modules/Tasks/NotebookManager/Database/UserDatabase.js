const path = require('path');
const database = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const initialize = (userId, configPath) => {
  console.log('ffff222')
  const configDatabasePath = path.join(__dirname, configPath);
  console.log('load user database ', configDatabasePath);
  const adapter = new FileSync(configDatabasePath);
  const configDatabase = database(adapter);
  const defaultObject = {};
  defaultObject[userId] = {};
  defaultObject[userId]['_mercury'] = {config: {}};
  defaultObject[userId]['notes'] = [];
  configDatabase.defaults(defaultObject).write();
  return configDatabase;
};

module.exports = async (userId, configPath) => {
  console.log('ffff')
  return initialize('Anonymous', '../../../../database/anonymous.json');
};
