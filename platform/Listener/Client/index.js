const testSender = require('./testSender');
const {ipcRenderer} = require('electron');

function initialize() {
  ipcRenderer.on(`${testSender.channel}-response`, testSender.action)
}


module.exports = initialize;
