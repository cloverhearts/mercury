const uuid = require('uuid/v4');

class Task {}

/**
 * Remote Task for Request.
 * @param type
 * @param serverChannel
 * @param clientChannel
 * @param jobId
 * @returns {{jobId: *, data: {}, cChannel: *, sChannel: *, taskId: *}}
 */
function createTaskMeta(type, serverChannel, clientChannel, jobId) {
  return {
    type,
    jobId,
    taskId: uuid(),
    sChannel: serverChannel,
    cChannel: clientChannel,
    data: {}
  }
}

module.exports = { createTaskMeta, Task }