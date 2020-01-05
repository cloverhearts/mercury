const os = require('os');
const path = require('path');
const npm = require('./npm-programmatic');

module.exports = (packageName) => {
  return new Promise((resolve, reject) => {
    try {
      const module = require(packageName);
      module.default ? resolve(module.default) : resolve(module);
    } catch (cannotFoundModule) {
      npm.install([packageName], {
        cwd: os.platform().match('win') ? path.join(__dirname, `../../../../`) : __dirname,
        save: true,
      }).then(function() {
        try {
          const module = require(packageName);
          module.default ? resolve(module.default) : resolve(module);
        } catch (moduleError) {
          reject(moduleError);
        }
      }).catch(function(e) {
        if (typeof window !== 'undefined' && window._mercury &&
          window._mercury.notification) {
          window._mercury.notification.warn(
            'Please install NodeJS\n(https://nodejs.org/en/download/)');
        }
        reject(e);
      });
    }
  });
};
