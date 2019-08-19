const _axios = require('axios')

async function fetch({ url = null, method = 'GET', data = {}}) {
  console.log(url, method, data)
  if (!url) {
    return
  }
  const response =  await _axios({ method, url, data });
  return response
}

exports.fetch = fetch
