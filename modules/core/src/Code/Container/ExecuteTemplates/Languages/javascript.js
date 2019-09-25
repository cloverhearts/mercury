export default (id, code, initializeObject) => {
  return `
    () => {
      return (async function (window) {
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
        }
      }).bind(this)(${initializeObject})
    }
  `
}
