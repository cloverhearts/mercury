const spawn = require('child_process').spawn;
const npmCommand = process.platform.match('win') ? 'npm.cmd' : 'npm';
module.exports = {
  install: function(packages, opts) {
    return new Promise((resolve, reject) => {
      if (!packages || packages.length <= 0) {
        reject('No packages found');
      }
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const executeNpm = spawn(npmCommand, ['install', '--save', 'node']);
      executeNpm.stdout.on('data', (data) => {
        console.log(data.toString());
        if (typeof window !== 'undefined' && window._mercury && window._mercury.notification) {
          window._mercury.notification.log(data.toString())
        }
      });

      executeNpm.stderr.on('data', (data) => {
        reject(data);
      });

      executeNpm.on('exit', (code) => {
        console.log(`Npm install child exited with code ${code}`);
        resolve();
      });
    });
  },
};