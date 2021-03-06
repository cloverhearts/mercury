import moment from 'moment'
import EventBroadcaster from 'observeable-object-js'

export default class Meta {
  constructor (metaObject) {
    const { config, createdAt, updatedAt, deletedAt, owner, history } = metaObject || {}
    this.config = config || {}
    this.createdAt =
      createdAt ||
      moment()
        .utc()
        .toISOString()
    this.updatedAt =
      updatedAt ||
      moment()
        .utc()
        .toISOString()
    this.deletedAt = deletedAt || null
    this.owner = owner || 'Anonymous'
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

  toSerialize () {
    const serializedObject = {}
    serializedObject.config = this.config
    serializedObject.createdAt = this.createdAt
    serializedObject.updatedAt = this.updatedAt
    serializedObject.deletedAt = this.deletedAt
    serializedObject.owner = this.owner
    serializedObject.history = this.history
    return serializedObject
  }
}
