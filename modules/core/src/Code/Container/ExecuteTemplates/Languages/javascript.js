export default (id, code, initializeObject) => {
  return `
    () => {
      return (async function (window) {
        const __mercury_executor_notifier = this._eventBroadcaster
        __mercury_executor_notifier.notify(this.channel.EXECUTOR, { status: 'EXECUTE_START' })
        const _mercury = window ? Object.assign({}, window._mercury) : {}
        const console = this.logger
        if (this.renderer && !_mercury.appRender.render) {
          _mercury.appRender = Object.assign({}, this.renderer)
          _mercury.appRender.render = (html, _native_dom = '#html-${id}') => this.renderer.render(html, document.querySelector(_native_dom))
        }
        try {
          const result = await (async () => {
            ${code}
          })()
        } catch (error) {
          console.error(error.toString())
          __mercury_executor_notifier.notify(this.channel.EXECUTOR, { status: 'EXECUTE_ERROR' })
          return
        }
        __mercury_executor_notifier.notify(this.channel.EXECUTOR, { status: 'EXECUTE_END' })
      }).bind(this)(${initializeObject})
    }
  `
}
