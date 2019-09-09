const uuidGenerator = require("uuid/v4");
const LANG = require("./SupportLang");
const Observer = require("observeable-object-js");
const ReportConsole = require("./ReportConsole");

class Reporter {
  constructor({ uuid, code, language, logs }) {
    this._observer = new Observer();
    this._code = code || "";
    this._uuid = uuid || uuidGenerator();
    this._language = language || LANG.JAVASCRIPT;
    this._logs = logs || [];
    if (window) {
      this._console = new ReportConsole(this._logs, window.console);
    } else {
      this._console = new ReportConsole(this._logs);
    }
    this._console.addEventListener("_console", (event, data) => {
      this._observer.notify("_broadcast", { type: "_console", data });
    });
  }

  get uuid() {
    return this._uuid;
  }

  get code() {
    return this._code;
  }

  set code(text) {
    this._code = text;
  }

  get language() {
    return this._language;
  }

  get logs() {
    return this._logs;
  }

  getConsole() {
    return this._console;
  }

  on(listener) {
    this._observer.addEventListener("_broadcast", listener);
  }

  removeEventListener(listener) {
    this._observer.removeEventListener("_broadcast", listener);
  }

  _getCodeWrap(language, code) {
    let template = "";
    switch (language) {
      case LANG.JAVASCRIPT:
      default:
        template = `
          () => { return ( async function ( { _mercury } ) { 
              const console = this.getConsole()
              try {
                  ${code}
              } catch(error) {
                  window.console.error(error)
              }
          }).bind(this)(window) }
        `;
    }
    return template;
  }

  getCommandFunction(code) {
    const executeCode = code || this.code;
    // eslint-disable-next-line no-eval
    const command = eval(this._getCodeWrap(this.language, executeCode));
    return command.bind(this);
  }
}

module.exports = { Reporter, LANG, ReportConsole };
