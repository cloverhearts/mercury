const fs = require('fs');
const path = require('path');
const taskPaths = path.join(__dirname, '../../Tasks');
const moment = require('moment');
const {ipcMain} = require('electron');

function initialize() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  fs.readdirSync(taskPaths).forEach(path => {
    const stat = fs.lstatSync(`${taskPaths}/${path}`);
    if (stat.isDirectory()) {
      try {
        const onServerStat = fs.lstatSync(`${taskPaths}/${path}/onServer.js`);
        if (onServerStat.isFile()) {
          const {meta, onServer} = require(`${taskPaths}/${path}/onServer.js`);
          if (meta && onServer) {
            ipcMain.on(meta.serverChannel, (event, response) => {
              onServer(response.data).then(result => {
                if (meta.clientChannel) {
                  if (result instanceof Error) {
                    const responseMeta = {
                      ...response,
                      data: {},
                      responseAt: moment().toISOString(),
                      error: {name: result.name, message: result.message},
                    };
                    event.sender.send(meta.clientChannel, responseMeta);
                  } else {
                    const responseMeta = {
                      ...response,
                      data: result,
                      responseAt: moment().toISOString(),
                    };
                    event.sender.send(meta.clientChannel, responseMeta);
                  }
                }
              });
            });
          }
        }
      } catch (e) {
      }
    }
  });
}

module.exports = initialize;