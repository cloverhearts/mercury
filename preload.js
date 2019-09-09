const { RemoteClient, ReportConsole, jsdom } = require("mercury-core");

window._mercury = {
  RemoteClient,
  ReportConsole,
  utils: {
    jsdom
  }
};
