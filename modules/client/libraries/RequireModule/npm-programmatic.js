const os = require('os');
const { exec } = require('child_process');
const npmCommand = os.platform() === 'win32' ? 'npm.cmd' : 'npm';

module.exports = {
  install: (packages, opts) => {
    return new Promise((resolve, reject) => {
      if (!packages || packages.length <= 0) {
        reject('No packages found');
      }

      exec(`${npmCommand} -v`, {
        shell: true,
        cwd: opts.cwd ? opts.cwd : null
      }, (error) => {
        if (error) {
          reject('Please install NodeJS\n(https://nodejs.org/en/download/), ' + npmCommand + ' not found');
        }

        console.log(`execute command ${npmCommand} install --save ${packages.join(' ')}`)

        exec(`${npmCommand} install -g ${packages.join(' ')}`, {
          shell: true,
          cwd: opts.cwd ? opts.cwd : null
        }, (error, stdout, stderr) => {
          if (error) {
            if (typeof window !== 'undefined' && window._mercury &&
              window._mercury.notification) {
              window._mercury.notification.error(error);
            }
            reject(error)
          }
          if (typeof window !== 'undefined' && window._mercury &&
            window._mercury.notification) {
            window._mercury.notification.log(stdout);
          }
          resolve(stdout)
        })
      })
    });
  },
};