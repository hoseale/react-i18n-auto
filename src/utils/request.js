import fetch from 'isomorphic-fetch';
import config from 'config/config';
import { isEmpty } from 'lodash';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export default function request(opt) {

  // 重写url 
  let url = config.getApi(opt.url, opt.app);
  const method = opt.method ? opt.method.toUpperCase() : 'GET';
  opt.method = method;
  opt.body = method === 'GET' ? null : opt.data;
  opt.headers = opt.headers || {};

  if (method !== 'GET' && opt.data && !(opt.data instanceof FormData)) { 
    if (!opt.headers['Content-Type']) {
      // 默认都为json
      opt.headers['Content-Type'] = 'application/json';
      opt.body = JSON.stringify(opt.data);
    }
  } else if (method === 'GET' && !isEmpty(opt.data)) {
    url = url + '?' + qs.stringify(opt.data)
  }

  const option = {
    credentials: 'same-origin',
    ...opt
  }

  return fetch(url, option)
  .then(checkStatus)
  .then(parseJSON)
  .then((data) => {
    return data;
  }).catch((err) => err );
}