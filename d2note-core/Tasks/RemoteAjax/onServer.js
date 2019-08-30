const axios = require('axios');
const meta = require('./meta');

async function onServer(request) {
  // return await axios.get('https://www.example.com')
  const _url = request.url;
  if (!_url) {
    return new Error('url is undefined');
  }
  const _method = request.method || 'GET';
  // sometimes if when send to empty data to occurs bad request.
  const _data = request.data && Object.keys(request.data).length > 1 ?
    request.data :
    null;
  try {
    const response = await axios({
      ...request,
      method: _method,
      url: _url,
      data: _data,
    });
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {meta, onServer};