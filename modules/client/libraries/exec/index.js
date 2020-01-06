const { exec, spawn } = require('child_process');

module.exports = {
  exec: (command, options = {}) => {
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
  },
  spawn: (command, args = [], options = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const response = spawn(command, args, options);
        let result = '';
        response.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
          if (typeof window !== 'undefined'&& window._mercury.notification) {
            window._mercury.notification.log(data);
          }
          result += data
        });

        response.stderr.on('data', (data) => {
          console.error(data);
          if (typeof window !== 'undefined' && window._mercury &&
            window._mercury.notification) {
            window._mercury.notification.error(data);
            reject(data)
          }
        });

        response.on('close', (code) => {
          resolve(result)
        })
      } catch (error) {
        reject(error)
      }
    });
  }
}