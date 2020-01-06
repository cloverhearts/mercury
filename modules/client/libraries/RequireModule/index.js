const path = require('path');
const npm = require('./npm-programmatic');

module.exports = (packageName) => {
  return new Promise((resolve, reject) => {
    try {
      const module = require(packageName);
      module.default ? resolve(module.default) : resolve(module);
    } catch (cannotFoundModule) {
      npm.install([packageName], {
        cwd: path.join(__dirname, `../../../../`),
        save: true,
      }).then(function(msg) {
        try {

          if (typeof window !== 'undefined' && window._mercury &&
            window._mercury.notification) {
            window._mercury.notification.log(msg);
          }

          const module = require(packageName);
          module.default ? resolve(module.default) : resolve(module);
        } catch (moduleError) {
          reject(moduleError);
        }
      }).catch(function(e) {
        if (typeof window !== 'undefined' && window._mercury &&
          window._mercury.notification) {
          window._mercury.notification.error(e);
        }
        reject(e);
      });
    }
  });
};
