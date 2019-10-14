const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const basepath = app.getAppPath();
// const isDev = require("electron-is-dev");
const server = require("./modules/server");
let mainWindow;

const isDev = process.env.MERCURY_ENV === "development";
const resourcePath = isDev ? basepath : process.resourcesPath;
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;

async function createWindow() {
  const WEB_FOLDER = path.join(resourcePath, "build");
  const PROTOCOL = "file";
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      title: "1 Mercury " + `file://${path.join(resourcePath, "build", "index.html")}`,
      nodeIntegration: false,
      preload: __dirname + `/preload.js`,
      webSecurity: false
    }
  });

  protocol.interceptFileProtocol(
    "file",
    (request, callback) => {
      const Url = new URL(request.url);
      const pathname = Url.pathname[0] === "/" ? Url.pathname.substr(1, Url.pathname.length) : Url.pathname;
      let servedUrl = pathname;
      let token = pathname.split("MERCURY/WEBAPP/PATH");
      if (pathname.match("MERCURY/WEBAPP/PATH")) {
        servedUrl = `${path.join(__dirname, "build", token[token.length - 1] || "")}`;
      }
      callback(servedUrl);
    },
    err => {
      if (err) console.error("Failed to register protocol");
    }
  );

  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(resourcePath, "build", "index.html")}`);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", server.initializeServer);
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
