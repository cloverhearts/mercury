import moment from 'moment'
import LOG_LEVEL from './Types'
import EventBroadcaster from 'observeable-object-js'

export default class {
  constructor (logs) {
    this._logs = logs && Array.isArray(logs) ? logs : []
    this._channel = {
      Logger: 'Logger'
    }
    Object.freeze(this._channel)
    this.eventBroadcaster = new EventBroadcaster()
  }

  get logs () {
    return this._logs
  }

  get channel () {
    return this._channel
  }

  addEventListener (event, listener) {
    this.eventBroadcaster.addEventListener(event, listener)
  }

  removeListener (event, listener) {
    this.eventBroadcaster.removeEventListener(event, listener)
  }

  _pushLog (level, ...data) {
    const context = Array.isArray(data) && data.length <= 1 ? data[0] : data
    const logItem = {
      level: level,
      time: moment()
        .utc()
        .unix(),
      data: context
    }
    this._logs.push(logItem)
    if (this._logs.length > 1000) {
      this._logs.shift()
    }
    setTimeout(() => {
      this.eventBroadcaster.notify(this.channel.Logger, logItem)
    })
  }

  clear () {
    const length = this._logs.length
    this._logs.splice(0, length)
  }

  log (...args) {
    this._pushLog(LOG_LEVEL.LOG, ...args)
  }

  warn (...args) {
    this._pushLog(LOG_LEVEL.LOG, ...args)
  }

  error (...args) {
    this._pushLog(LOG_LEVEL.LOG, ...args)
  }
}
