import moment from "moment";
import EventBroadcaster from "observeable-object-js";

export default class Meta {
  constructor({ config, createdAt, updatedAt, deletedAt, owner, history }) {
    this.config = config || {};
    this.createdAt = createdAt || moment().toISOString();
    this.updatedAt = updatedAt || moment().toISOString();
    this.deletedAt = deletedAt || null;
    this.owner = owner || null;
    this.history = history || [];
    this._eventBroadcaster = new EventBroadcaster();
    this.channel = {
      HISTORY: "_history"
    };
  }

  addEventListener(event, listener) {
    this._eventBroadcaster.addEventListener(event, listener);
  }

  removeListener(event, listener) {
    this._eventBroadcaster.removeEventListener(event, listener);
  }
}
