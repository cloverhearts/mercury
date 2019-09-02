const uuidGenerator = require('uuid/v4');
const LANG = require('./SupportLang')
const ReportConsole = require('./ReportConsole')
class Reporter {
  constructor({uuid, code, language, logs}) {
    this._code = code || '';
    this._uuid = uuid || uuidGenerator();
    this._language = language || 'javascript'
    this._logs = logs || []
  }

  get uuid () {
    return this._uuid
  }

  get code() {
    return this._code;
  }

  set code(text) {
    this._code = text;
  }

  get language() {
    return this._language
  }

  _getCodeWrap(language, code) {
    let template = ''
    switch(language) {
      case LANG.JAVASCRIPT:
      default:
        template = `
          (async function({ _mercury }) { const console = new _mercury.ReportConsole("${this.uuid}", window.console); try {${code}} catch(error) { console.error(error)} })(window)
        `
    }
    return template
  }

  /**
   * push log history.
   * @param type log || warn || error
   * @param context
   */
  pushLog(type = 'log', context = {}) {
    this._logs.push({ type, context})
  }

  get logs() {
    return this._logs
  }

  getCommand() {
    return this._getCodeWrap(this.language, this.code)
  }
}

module.exports = { Reporter, LANG, ReportConsole};