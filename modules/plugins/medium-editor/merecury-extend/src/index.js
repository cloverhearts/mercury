export default class {
  constructor () {
    this.name = 'mercury-extenstion'
    this.button = this._createToolbarButton()
    this.button.onclick = this.onClick
  }

  init () {
    console.log('initialize ', this.name)
  }

  _createToolbarButton () {
    const button = document.createElement('button')
    button.className = 'medium-editor-action'
    button.innerHTML = 'CloverBold2'
    return button
  }

  onClick (event) {
    console.log('hohoh')
  }

  getButton () {
    return this.button
  }
}
