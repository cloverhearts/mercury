import moment from 'moment'
import EventBroadcaster from 'observeable-object-js'

export default class Meta {
  constructor (metaObject) {
    const { config, createdAt, updatedAt, deletedAt, owner, history } = metaObject ||
    {}
    this.config = config || {}
    this.createdAt = createdAt || moment().toISOString()
    this.updatedAt = updatedAt || moment().toISOString()
    this.deletedAt = deletedAt || null
    this.owner = owner || null
    // TODO(cloverhearts): need to history feature in future.
    this.history = history || []
    this._eventBroadcaster = new EventBroadcaster()
    this.channel = {
      HISTORY: '_history'
    }
  }

  addEventListener (event, listener) {
    this._eventBroadcaster.addEventListener(event, listener)
  }

  removeListener (event, listener) {
    this._eventBroadcaster.removeEventListener(event, listener)
  }

  assignCreatedAt (createdAt) {
    this.createdAt = createdAt || moment().toISOString()
  }

  assignUpdatedAt (updatedAt) {
    this.updatedAt = updatedAt || moment().toISOString()
  }

  assignDeletedAt (deletedAt) {
    this.deletedAt = deletedAt || moment().toISOString()
  }
}
