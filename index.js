const {app, remote, ipcMain, ipcRenderer, BrowserWindow} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const platform = require('./platform/app')
let mainWindow;

async function createWindow() {
  const test = require('electron');
  mainWindow = new BrowserWindow({
    width: 900, height: 680, webPreferences: {
      nodeIntegration: false,
      preload: __dirname + `/preload.js`,
    },
  });
  mainWindow.loadURL(isDev ?
    'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);

  // const response = await test({url: 'https://www.naver.com'})
  // console.log(response)
}

app.on('ready', platform.receiver)
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

