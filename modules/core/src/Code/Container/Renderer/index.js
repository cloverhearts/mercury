export const loader = () => {
  return new Promise(resolve => {
    try {
      if (window) {
        import(/* webpackMode: "eager" */'./Browser').then(imported => {
          resolve(imported.default)
        })
      } else {
        import(/* webpackMode: "eager" */'./NonBrowser').then(imported => {
          resolve(imported.default)
        })
      }
    } catch (error) {
      import(/* webpackMode: "eager" */'./NonBrowser').then(imported => {
        resolve(imported.default)
      })
    }
  })
}
