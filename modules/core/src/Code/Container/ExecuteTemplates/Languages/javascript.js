export default (id, code, initializeObject) => {
  return `
    () => {
      return (async function (window) {
        const __mercury_executor_notifier = this._eventBroadcaster
        __mercury_executor_notifier.notify(this.channel.EXECUTOR, { status: 'EXECUTE_START' })
        const _mercury = window ? window._mercury : {}
        const console = this.logger
        let html = this.renderer && this.renderer.html ? this.renderer.html : () => { };
        let render = this.renderer && this.renderer.render ? (html, _native_dom = '#html-${id}') => this.renderer.render(html, document.querySelector(_native_dom)) : () => {};
        setTimeout(() => {
          html = this.renderer.html
          render = (html, _native_dom = '#html-${id}') => this.renderer.render(html, document.querySelector(_native_dom))
        }, 10)
        try {
          ${code}
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
