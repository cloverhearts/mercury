import UUID from 'uuid/v4'
import moment from 'moment'
import MetaObject from './Meta'
import CodeContainer from '../Code/Container'
export default class {
  constructor ({ parent, parentId, title, id, meta, content, containers = [] }) {
    this.parentId = parentId || null
    this.parent = parent || null
    this.id = id || `paragraph-${UUID()}`
    this.meta = new MetaObject(meta)
    this.content = content || ''
    this.title =
      title ||
      `New Pragraph ${moment()
        .utc()
        .toISOString()}`
    this.containers = !containers ? [] : containers.map(container => new CodeContainer(container))
  }

  get note () {
    return this.parent
  }

  toSerialize () {
    const serializedObject = {}
    serializedObject.parentId = this.parentId
    serializedObject.id = this.id
    serializedObject.title = this.title
    serializedObject.content = this.content
    serializedObject.meta = this.meta.toSerialize()
    serializedObject.containers = this.containers.map(container => container.toSerialize())
    return serializedObject
  }
}
