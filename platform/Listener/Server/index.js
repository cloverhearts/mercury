const testReceiver = require('./testReceiver');
const {ipcMain} = require('electron');

function initialize() {
  console.log('initialize!')
  ipcMain.on(testReceiver.channel, testReceiver.action);
}

module.exports = initialize;
