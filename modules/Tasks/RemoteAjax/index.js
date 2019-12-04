const CommonMeta = require('./meta');
const {createTask} = require('../Task');

const meta = {
  ...CommonMeta,
  onRender: (response) => {
    return response && response.data ? response.data : response;
  },
};

module.exports = {meta, task: createTask(meta)};
