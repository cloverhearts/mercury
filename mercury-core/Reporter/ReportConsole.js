class ReportConsole {
  constructor(_id, _console) {
    this._id = _id
    this._console = Object.assign({}, _console)
  }

  get id() {
    return this._id
  }

  log(...args) {
    console.log('reportconsole l', ...args)
    this._console.log(...args)
  }

  warn(...args) {
    console.log('reportconsole w', ...args)
    this._console.warn(...args)
  }

  error(...args) {
    console.log('reportconsole e', ...args)
    this._console.error(...args)
  }

}

module.exports = ReportConsole