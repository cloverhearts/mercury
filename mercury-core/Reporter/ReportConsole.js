const moment = require('moment');
const Observer = require('observeable-object-js');
const LOG_LEVELS = {
  WARN: 'warn',
  LOG: 'log',
  ERROR: 'error',
};

class ReportConsole {
  constructor(_logs, builtInConsole = null) {
    this._observer = new Observer();
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

  get themes() {
    return {
      log: {
        BASE_FONT_FAMILY: 'Source Code Pro',
        BASE_FONT_SIZE: '14px',
        TREENODE_FONT_FAMILY: 'Source Code Pro',
        TREENODE_FONT_SIZE: '14px',
        BASE_BACKGROUND_COLOR: '#fff', BASE_COLOR: '#000',
        OBJECT_NAME_COLOR: 'rgb(136, 19, 145)',
        OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
        OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
        OBJECT_VALUE_BOOLEAN_COLOR: 'rgb(28, 0, 207)',
        OBJECT_VALUE_FUNCTION_PREFIX_COLOR: 'rgb(13, 34, 170)',
        OBJECT_VALUE_NULL_COLOR: 'rgb(128, 128, 128)',
        OBJECT_VALUE_NUMBER_COLOR: 'rgb(28, 0, 207)',
        OBJECT_VALUE_REGEXP_COLOR: '#303942',
        OBJECT_VALUE_STRING_COLOR: '#303942',
        OBJECT_VALUE_SYMBOL_COLOR: '#303942',
        OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(128, 128, 128)',
      },
      warn: {
        BASE_FONT_FAMILY: 'Source Code Pro',
        BASE_FONT_SIZE: '14px',
        TREENODE_FONT_FAMILY: 'Source Code Pro',
        TREENODE_FONT_SIZE: '14px',
        BASE_BACKGROUND_COLOR: '#fffbe5', BASE_COLOR: '#5c3c00',
        OBJECT_NAME_COLOR: 'rgb(136, 19, 145)',
        OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
        OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
        OBJECT_VALUE_BOOLEAN_COLOR: 'rgb(28, 0, 207)',
        OBJECT_VALUE_FUNCTION_PREFIX_COLOR: 'rgb(13, 34, 170)',
        OBJECT_VALUE_NULL_COLOR: 'rgb(128, 128, 128)',
        OBJECT_VALUE_NUMBER_COLOR: 'rgb(28, 0, 207)',
        OBJECT_VALUE_REGEXP_COLOR: '#5c3c00',
        OBJECT_VALUE_STRING_COLOR: '#5c3c00',
        OBJECT_VALUE_SYMBOL_COLOR: '#5c3c00',
        OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(128, 128, 128)',
      },
      error: {
        BASE_FONT_FAMILY: 'Source Code Pro',
        BASE_FONT_SIZE: '14px',
        TREENODE_FONT_FAMILY: 'Source Code Pro',
        TREENODE_FONT_SIZE: '14px',
        BASE_BACKGROUND_COLOR: '#fff0f0', BASE_COLOR: '#ff0000',
        OBJECT_NAME_COLOR: 'rgb(136, 19, 145)',
        OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
        OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
        OBJECT_VALUE_BOOLEAN_COLOR: 'rgb(28, 0, 207)',
        OBJECT_VALUE_FUNCTION_PREFIX_COLOR: 'rgb(13, 34, 170)',
        OBJECT_VALUE_NULL_COLOR: 'rgb(128, 128, 128)',
        OBJECT_VALUE_NUMBER_COLOR: 'rgb(28, 0, 207)',
        OBJECT_VALUE_REGEXP_COLOR: 'rgb(196, 26, 22)',
        OBJECT_VALUE_STRING_COLOR: 'rgb(196, 26, 22)',
        OBJECT_VALUE_SYMBOL_COLOR: 'rgb(196, 26, 22)',
        OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(128, 128, 128)',
      },
    };
  }

  clear() {
    this._logs.splice(0, this._logs.length)
    setTimeout(() => {
      this._observer.notify('_console',
        'clear');
    });
  }

  addEventListener(...events) {
    this._observer.addEventListener(...events);
  }

  removeEventListener(...events) {
    this._observer.removeEventListener(...events);
  }

  _pushLog(_level, _time = moment().utc().unix(), ..._data) {
    const logData = _data.length <= 1 ? _data[0] : _data;
    this._logs.push({level: _level, time: _time, data: logData});
    if (this._logs.length > 1000) {
      this._logs.shift();
    }
    setTimeout(() => {
      this._observer.notify('_console',
        {level: _level, time: _time, data: logData});
    });
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