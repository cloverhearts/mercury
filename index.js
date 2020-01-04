const { app, BrowserWindow, protocol } = require("electron");
const contextMenu = require('electron-context-menu');
const path = require("path");
const basepath = app.getAppPath();
// const isDev = require("electron-is-dev");
const server = require("./modules/server");
let mainWindow;

const isDev = process.env.MERCURY_ENV === "development";
const resourcePath = isDev ? basepath : process.resourcesPath;
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;


contextMenu({
  showCopyImage: true,
  showCopyImageAddress: true,
  showSaveImageAs: true,
  showServices: true,
  showInspectElement: true,
  prepend: (defaultActions, params, browserWindow) => [
    {
      label: 'Force Reload',
      click: () => {
        browserWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(resourcePath, "build", "index.html")}`)
      }
    }
  ]
});

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      title: "Mercury",
      nodeIntegration: false,
      preload: __dirname + `/preload.js`,
      webSecurity: false
    }
  });
  mainWindow.setMenu(null)

  protocol.interceptFileProtocol(
    "file",
    (request, callback) => {
      const Url = new URL(request.url);
      const pathname = Url.pathname[0] === "/" ? Url.pathname.substr(1, Url.pathname.length) : Url.pathname;
      let servedUrl = pathname;
      let token = pathname.split("MERCURY/WEBAPP/PATH");
      if (pathname.match("MERCURY/WEBAPP/PATH")) {
        servedUrl = `${path.join(resourcePath, "build", token[token.length - 1] || "")}`;
      }
      callback(servedUrl);
    },
    err => {
      if (err) console.error("Failed to register protocol");
    }
  );

  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(resourcePath, "build", "index.html")}`);

  if (isDev) {
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => (mainWindow = null));

  mainWindow.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}

app.on("ready", server.initializeServer);
app.on("ready", createWindow);

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
