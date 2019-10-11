const UUID = require("uuid/v4");
const FetchAPI = require("../../../Tasks/RemoteAjax");
const fetch = FetchAPI.task;

const defaultOption = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  headers: {},
  redirect: "follow",
  referrer: "no-referrer",
  body: null
};

module.exports = (url, _options = {}, _jobID = UUID()) => {
  const option = {
    ...defaultOption,
    ..._options
  };
  return fetch
    .build(_jobID, {
      url,
      ...option
    })
    .send();
};
