const axios = require('axios');
const meta = require('./meta');

async function onServer(request) {
  const _url = request.url;
  if (!_url) {
    return new Error('url is undefined')
  }
  const _method = request.method || 'GET';
  const _data = request.data || {};
  try {
    const response = await axios({
      ...request,
      method: _method,
      url: _url,
      data: _data
    });
    return response;
  } catch (e) {
    return e
  }
};

module.exports = {meta, onServer};