const uuid = require('uuid/v4');
const moment = require('moment');
const {ipcRenderer} = require('electron');

class Task {
  constructor(_taskMeta, onRender) {
    this._taskMeta = _taskMeta;
    this._onRender = onRender;
  }

  meta() {
    return this._taskMeta;
  }

  send() {
    const requestMeta = {...this._taskMeta, requestAt: moment().toISOString()};
    const _resListener = (event, response) => {
      ipcRenderer.removeListener(requestMeta.cChannel, _resListener);
      if (this._onRender) {
        const result = this._onRender(response);
      }
    };
    ipcRenderer.on(requestMeta.cChannel, _resListener);
    ipcRenderer.send(requestMeta.sChannel, requestMeta);
  }
}

/**
 * Remote Task for Request.
 * @param type
 * @param serverChannel
 * @param clientChannel
 * @param jobId
 * @returns {{jobId: *, data: {}, cChannel: *, sChannel: *, type: *, taskId: *}}
 */
function createTaskMeta(type, serverChannel, clientChannel, jobId) {
  return {
    type,
    jobId,
    taskId: uuid(),
    sChannel: serverChannel,
    cChannel: clientChannel,
    requestAt: null,
    responseAt: null,
    data: {},
  };
}

/**
 * create Task.
 * @param type
 * @param clientChannel
 * @param serverChannel
 * @param JobTask
 * @returns {{build: (function(*=, *=): Task)}}
 */
function createTask(
  {type, clientChannel, serverChannel, onRender}, JobTask = Task) {
  const _type = type || 'unknown-type';
  const _clientChannel = clientChannel || 'unknown-channel';
  const _serverChannel = serverChannel || `${_clientChannel}-response`;
  return {
    build: function(jobId, data) {
      const taskMeta = createTaskMeta(_type, _serverChannel, _clientChannel,
        jobId);
      taskMeta.data = data || {};
      return new JobTask(taskMeta, onRender);
    },
  };
}

module.exports = {createTask};
