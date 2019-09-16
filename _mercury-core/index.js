const clientModules = require('./client');
const serverModules = require('./server');

module.exports = {...clientModules, ...serverModules};
