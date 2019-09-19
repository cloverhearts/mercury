import UUID from "uuid/4";
import EventBroadcaster from "observeable-object-js";
import LANGUAGE from "../Languages/Types";

export default class Container {
  constructor(containerObject) {
    this.id = containerObject && containerObject.uuid ? containerObject.id : UUID();
    Object.freeze(this.id);
    this.language = containerObject && containerObject.language ? containerObject.language : LANGUAGE.JAVASCRIPT;
    this.code = containerObject && containerObject.code ? containerObject.code : "";
    this.eventBroadcaster = new EventBroadcaster();
  }
}
