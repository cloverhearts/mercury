const { exec } = require('child_process');

module.exports = (command, options = {}) => {
  return new Promise((resolve, reject) => {
    try {
      exec(command, options, (error, stdout, stderr) => {
        if (error) {
          console.error(error)
          if (typeof window !== 'undefined' && window._mercury &&
            window._mercury.notification) {
            window._mercury.notification.error(error);
          }
          reject(error)
        }
        console.log(stdout)
        if (typeof window !== 'undefined' && window._mercury &&
          window._mercury.notification) {
          window._mercury.notification.log(stdout);
        }
        resolve(stdout)
      })
    } catch (error) {
      reject(error)
    }
  });
};