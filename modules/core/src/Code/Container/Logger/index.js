import LOG_LEVEL from "./Types";
import EventBroadcaster from "observeable-object-js";

export default class {
  constructor(logs, builtInConsole = null) {
    this._logs = logs && Array.isArray(logs) ? logs : [];
    this._builtInConsole = builtInConsole;
    this.eventBroadcaster = new EventBroadcaster();
  }

  get logs() {
    return this._logs;
  }

  addEventListener(...events) {
    this.EventBroadcaster.addEventListener(...events);
  }

  removeEventListener(...events) {
    this.EventBroadcaster.removeEventListener(...events);
  }
}
