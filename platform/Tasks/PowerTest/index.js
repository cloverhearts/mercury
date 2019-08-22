const {ipcRenderer} = require('electron');
const {createTaskMeta, Task} = require('../Task');

class PowerTestTask extends Task {
  constructor(taskMeta) {
    super();
    this.taskMeta = taskMeta;
  }
  send() {
    console.log(this.taskMeta)
    ipcRenderer.send(this.taskMeta.sChannel, this.taskMeta);
  }
}

module.exports = {
  Builder: function(jobId) {
    const taskMeta = createTaskMeta('PowerTestTask', 'test', 'test-response',
      jobId);
    taskMeta.data = {
      message: '',
    };
    const meta = {
      message: function(value) {
        taskMeta.data.message = value;
        return meta;
      },
      build: function() {
        return new PowerTestTask(taskMeta);
      },
    };
    return meta;
  },
};
