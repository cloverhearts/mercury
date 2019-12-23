const npm = require('npm-programmatic')

module.exports = (packageName) => {
  return new Promise((resolve, reject) => {
    try {
      const module = require(packageName)
      module.default ? resolve(module.default) : resolve(module)
    } catch (cannotFoundModule) {
      npm.install([packageName], {
        cwd: __dirname,
        save: false
      })
      .then(function(){
        try {
          const module = require(packageName)
          module.default ? resolve(module.default) : resolve(module)
        } catch (moduleError) {
          reject(moduleError)
        }
      })
      .catch(function(e){
        reject(e)
      });
    }
  })
}
