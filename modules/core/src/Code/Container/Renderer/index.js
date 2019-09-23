export const loader = () => {
  return new Promise(resolve => {
    try {
      if (window) {
        import('./Browser').then(imported => {
          resolve(imported.default)
        })
      } else {
        import('./NonBrowser').then(imported => {
          resolve(imported.default)
        })
      }
    } catch (error) {
      import('./NonBrowser').then(imported => {
        resolve(imported.default)
      })
    }
  })
}
