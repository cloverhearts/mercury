import UUID from 'uuid/v4'
import EventBroadcaster from 'observeable-object-js'
import LANGUAGE from '../Languages/Types'
import Logger from './Logger'
import { loader } from './Renderer'

const esprima = require('esprima')

export default class {
  constructor (containerObject) {
    this.id = containerObject && containerObject.id ? containerObject.id : UUID()
    this.language = containerObject && containerObject.language ? containerObject.language : LANGUAGE.JAVASCRIPT
    this.code = containerObject && containerObject.code ? containerObject.code : ''
    this.logs = containerObject && containerObject.logs ? containerObject.logs : []
    this.logger = new Logger(this.logs)
    this._eventBroadcaster = new EventBroadcaster()
    this.channel = {
      BROADCAST: '_broadcast',
      LOGGER: '_logger'
    }
    Object.freeze(this.channel)
    this.logger.addEventListener(this.logger.channel.Logger, (event, data) => {
      this._eventBroadcaster.notify(this.channel.LOGGER, { type: this.channel.LOGGER, data })
      this._eventBroadcaster.notify(this.channel.BROADCAST, { type: this.channel.LOGGER, data })
    })
    loader().then(imported => {
      this.renderer = imported
    })
    this._esprima = esprima
  }

  addEventListener (event, listener) {
    this._eventBroadcaster.addEventListener(event, listener)
  }

  removeListener (event, listener) {
    this._eventBroadcaster.removeEventListener(event, listener)
  }

  _getCodeWrap (language, code, initializeObject = 'window') {
    let template = ''
    let syntaxValidateError = null
    switch (language) {
      case LANGUAGE.JAVASCRIPT:
      default:
        try {
          this._esprima.parseScript(code)
        } catch (error) {
          syntaxValidateError = error
        }
        template = `
          () => {
            return (async function (window) {
              const _mercury = window ? window._mercury : {}
              const console = this.logger
              let html = this.renderer && this.renderer.html ? this.renderer.html : () => { };
              let render = this.renderer && this.renderer.render ? (html, _native_dom = '#html-${this.id}') => this.renderer.render(html, document.querySelector(_native_dom)) : () => { };
              setTimeout(() => {
                html = this.renderer.html
                render = (html, _native_dom = '#html-${this.id}') => this.renderer.render(html, document.querySelector(_native_dom))
              }, 10)
              try {
                ${syntaxValidateError ? `throw '${syntaxValidateError}'` : code}
              } catch (error) {
                console.error(error.toString())
              }
            }).bind(this)(${initializeObject})
          }
        `
    }
    return template
  }

  getCommandFunction (code, initializeObject = 'window') {
    const executeCode = code || this.code
    // eslint-disable-next-line no-eval
    const command = eval(this._getCodeWrap(this.language, executeCode, initializeObject))
    return command.bind(this)
  }
}
