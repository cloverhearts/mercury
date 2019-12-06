const requireFromUrl = require('require-from-url');

module.exports = (url) => {
  return new Promise((resolve) => {
    requireFromUrl([url], (_, modules) => {
      resolve({...modules});
    });
  });
}