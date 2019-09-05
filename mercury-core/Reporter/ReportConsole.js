const moment = require('moment');
const Observer = require('observeable-object-js')
const LOG_LEVELS = {
  WARN: 'warn',
  LOG: 'log',
  ERROR: 'error',
};

class ReportConsole {
  constructor(_logs, builtInConsole = null) {
    this._observer = new Observer()
    this._logs = _logs;
    this._console = builtInConsole || {
      log: () => {
      }, warn: () => {
      }, error: () => {
      },
    };
  }

  get logs() {
    return this._logs;
  }

  addEventListener(...events) {
    this._observer.addEventListener(...events)
  }

  removeEventListener(...events) {
    this._observer.removeEventListener(...events)
  }

  _pushLog(_level, _time = moment().utc().unix(), _data) {
    this._observer.notify('_console', {level: _level, time: _time, data: _data});
    this._logs.push({level: _level, time: _time, data: _data});
    if (this._logs.length > 1000) {
      this._logs.shift();
    }
  }

  log(...args) {
    this._pushLog(LOG_LEVELS.LOG, moment().utc().unix(), ...args);
    this._console.log(...args);
  }

  warn(...args) {
    this._pushLog(LOG_LEVELS.WARN, moment().utc().unix(), ...args);
    this._console.warn(...args);
  }

  error(...args) {
    this._pushLog(LOG_LEVELS.ERROR, moment().utc().unix(), ...args);
    this._console.error(...args);
  }

}

module.exports = ReportConsole;