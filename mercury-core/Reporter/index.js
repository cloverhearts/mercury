const uuidGenerator = require('uuid/v4');
const LANG = require('./SupportLang');
const ReportConsole = require('./ReportConsole');

class Reporter {
  constructor({uuid, code, language, logs}) {
    this._code = code || '';
    this._uuid = uuid || uuidGenerator();
    this._language = language || LANG.JAVASCRIPT;
    this._logs = logs || [];
    if (window) {
      this._console = new ReportConsole(this._logs, window.console);
    } else {
      this._console = new ReportConsole(this._logs);
    }
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

  /*

  () => (async function ( { _mercury } ) {
              console.log('this? ', this)
              this.console.setConsole(window.console);
              console.log('fff', this.console)
              const console = this.console;
              const Reporter = this;
              try {
                  // ${code}
              } catch(error) {
                  window.console.error(error)
              }
          })(window)
   */

  _getCodeWrap(language, code) {
    let template = '';
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
    return command.bind(this)
  }
}

module.exports = {Reporter, LANG, ReportConsole};