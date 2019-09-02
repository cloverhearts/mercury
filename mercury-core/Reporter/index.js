const uuidGenerator = require('uuid/v4');

class Reporter {
  constructor({uuid, code}) {
    this._code = code || '';
    this._uuid = uuid || uuidGenerator();
  }

  get uuid () {
    return this._uuid
  }

  get code() {
    console.log('Cooode get ', this._code);
    return this._code;
  }

  set code(text) {
    console.log('Cooode set ', this._code, text);
    this._code = text;
  }
}

module.exports = Reporter;