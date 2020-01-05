const os = require('os');
const {spawn} = require('child_process');
const npmCommand = os.platform().match('win') ? 'npm.cmd' : 'npm';
module.exports = {
  install: function(packages, opts) {
    return new Promise((resolve, reject) => {
      if (!packages || packages.length <= 0) {
        reject('No packages found');
      }

      const executeNpm = spawn(npmCommand, [
        'install',
        '--save',
        ...packages], {
        env: {'NODE_TLS_REJECT_UNAUTHORIZED': '0'},
        shell: true,
        stdio: 'inherit',
        cwd: opts.cwd ? opts.cwd : null,
        maxBuffer: opts.maxBuffer ? opts.maxBuffer : 200 * 1024,
      });
      executeNpm.on('data', (data) => {
        console.log(data.toString());
        if (typeof window !== 'undefined' && window._mercury &&
          window._mercury.notification) {
          window._mercury.notification.log(data.toString());
        }
      });

      executeNpm.on('stderr', (data) => {
        reject(data);
      });

      executeNpm.on('exit', (code) => {
        console.log(`Npm install child exited with code ${code}`);
        resolve();
      });

      executeNpm.on('close', (code) => {
        console.log(`Npm install child exited with code ${code}`);
        resolve();
      });
    });
  },
};