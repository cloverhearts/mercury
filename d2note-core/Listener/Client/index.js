const fs = require('fs');
const path = require('path');
const taskPaths = path.join(__dirname, '../../Tasks');
const remoteClient = {};

function initialize() {
  fs.readdirSync(taskPaths).forEach(path => {
    const stat = fs.lstatSync(`${taskPaths}/${path}`);
    if (stat.isDirectory()) {
      try {
        const onServerStat = fs.lstatSync(`${taskPaths}/${path}/index.js`);
        if (onServerStat.isFile()) {
          const {meta, task} = require(`${taskPaths}/${path}/index.js`);
          if (meta && meta.type && task) {
            remoteClient[meta.type] = task;
          }
        }
      } catch (e) {
      }
    }
  });
}
initialize();

module.exports = {remoteClient};