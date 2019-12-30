
export const CODE = `const npmModule = _mercury.utils.npmModule
const jsdom = _mercury.utils.jsdom
const _ = _mercury.utils.lodash // await npmModule('lodash')
const HTML = _mercury.appRender.html
const RENDER = _mercury.appRender.render

console.log('Hello Mercury console')
console.warn('this is a warning console')
console.error('this is a error console')
// console.clear('clear console')

const styles = HTML\`
<style>
.hello-mercury {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
}
.version {
    color: #137cbd;
}
.version:hover {
    color: purple;
}
</style>
\`
const version = \`SUJINI\`
const onClick = (e) => console.log(\`Hello, $\{version}\`)

const content = HTML\`
    $\{styles} 
    <div class="hello-mercury">Hello MERCURY - <span class="version" @click="$\{onClick}">$\{version} VERSION</span></div>
\`
RENDER(content)
`

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
