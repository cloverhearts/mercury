const npm = require("npm");

module.exports = (packageName) => {
  return new Promise((resolve, reject) => {
    try {
      const module = require(packageName)
      module.default ? resolve(module.default) : resolve(module)
    } catch (cannotFoundModule) {
      npm.load({
        loaded: false
      }, function (err) {
        npm.commands.install([packageName], function (error, data) {
          if (error) {
            reject(error)
          }
          try {
            const module = require(packageName)
            module.default ? resolve(module.default) : resolve(module)
          } catch (moduleError) {
            reject(moduleError)
          }
        });
      });
    }
  })
}
