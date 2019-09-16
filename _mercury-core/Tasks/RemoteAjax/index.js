const CommonMeta = require('./meta');
const {createTask} = require('../Task');

const meta = {
  ...CommonMeta,
  onRender: (response) => {
    return response;
  },
};

module.exports = {meta, task: createTask(meta)};
