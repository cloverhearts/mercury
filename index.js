const {app, BrowserWindow} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const core = require('mercury');
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
}

app.on('ready', core.initializeServer);
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

