import UUID from 'uuid/v4'
import EventBroadcaster from 'observeable-object-js'
import LANGUAGE from '../Languages/Types'
import Logger from './Logger'
import { loader } from './Renderer'
import Template from './ExecuteTemplates'
import Meta from '../Meta'

const esprima = require('esprima')

export default class {
  constructor (containerObject) {
    this.id = containerObject && containerObject.id ? containerObject.id : `code-editor-container-${UUID()}`
    this.language = containerObject && containerObject.language ? containerObject.language : LANGUAGE.JAVASCRIPT
    this.code = containerObject && containerObject.code ? containerObject.code : '// javascript code to make here.'
    this.logs = containerObject && containerObject.logs ? containerObject.logs : []
    this.logger = new Logger(this.logs)
    this._eventBroadcaster = new EventBroadcaster()
    this.channel = {
      BROADCAST: '_broadcast',
      LOGGER: '_logger',
      EXECUTOR: '_executor'
    }
    Object.freeze(this.channel)
    this.logger.addEventListener(this.logger.channel.Logger, (event, data) => {
      this._eventBroadcaster.notify(this.channel.LOGGER, { type: this.channel.LOGGER, data })
      this._eventBroadcaster.notify(this.channel.BROADCAST, { type: this.channel.LOGGER, data })
    })
    this.renderer = null
    this._esprima = esprima
    this.meta = containerObject ? new Meta(containerObject.meta || {}) : new Meta()
    this.render = containerObject ? containerObject.render : {}
  }

  addEventListener (event, listener) {
    this._eventBroadcaster.addEventListener(event, listener)
  }

  removeListener (event, listener) {
    this._eventBroadcaster.removeEventListener(event, listener)
  }

  _getCodeWrap (language, code, initializeObject = 'window') {
    let syntaxValidateError = null
    switch (language) {
      case LANGUAGE.JAVASCRIPT:
      default:
        try {
          this._esprima.parseScript(Template(LANGUAGE.JAVASCRIPT, this.id, code, initializeObject))
        } catch (error) {
          syntaxValidateError = error
        }
        return Template(
          LANGUAGE.JAVASCRIPT,
          this.id,
          syntaxValidateError ? `throw '${syntaxValidateError}'` : code,
          initializeObject
        )
    }
  }

  getCommandFunction (code, initializeObject = 'window') {
    const container = this
    return new Promise((resolve) => {
      const generator = () => {
        const executeCode = code || this.code
        if (!this.renderer) {
          loader().then(libraries => {
            const withRenderer = () => {
              this.renderer = libraries
              // eslint-disable-next-line no-eval
              const command = eval(this._getCodeWrap(this.language, executeCode, initializeObject))
              resolve(command.bind(container))
            }
            withRenderer.call(container)
          })
        } else {
          // eslint-disable-next-line no-eval
          const command = eval(this._getCodeWrap(this.language, executeCode, initializeObject))
          resolve(command.bind(container))
        }
      }
      generator.call(container)
    })
  }

  toSerialize () {
    const serializedObject = {}
    serializedObject.id = this.id
    serializedObject.language = this.language
    serializedObject.code = this.code
    serializedObject.logs = this.logs
    serializedObject.meta = this.meta.toSerialize()
    serializedObject.render = this.render
    return serializedObject
  }
}
