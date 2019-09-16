const MercuryCore = require("mercury-core");

const RemoteClient = MercuryCore.RemoteClient;
const ReportConsole = MercuryCore.ReportConsole;
const jsdom = MercuryCore.jsdom;

window._mercury = {
  RemoteClient,
  ReportConsole,
  utils: {
    jsdom
  }
};
