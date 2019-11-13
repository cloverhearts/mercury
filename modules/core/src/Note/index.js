import UUID from "uuid/v4";
import moment from "moment";
import MetaObject from "./Meta";
import Paragraph from "../Paragraph";
export default class {
  constructor({ title, id, meta, paragraphs = [] }) {
    this.title =
      title ||
      `New Note ${moment()
        .utc()
        .toISOString()}`;
    this.id = id || `note-${UUID()}`;
    this.meta = new MetaObject(meta);
    this.paragraphs = !paragraphs
      ? []
      : paragraphs.map(paragraph => {
          return new Paragraph({ parent: this, parentId: this.id, ...paragraph });
        });
  }

  toSerialize() {
    const serializedObject = {};
    serializedObject.id = this.id;
    serializedObject.title = this.title;
    serializedObject.paragraphs = this.paragraphs.map(paragraph => paragraph.toSerialize());
    serializedObject.meta = this.meta.toSerialize();
    return serializedObject;
  }
}
