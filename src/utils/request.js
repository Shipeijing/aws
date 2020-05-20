import fetch from 'dva/fetch';
import {
  message
} from 'antd';

function parseJSON(response) {
  return response.json();
}
function checkStatus(response) {
  if (response.status === 409) {
    return response;
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 504) {
    message.error(response.statusText)
    return response;
  }
  message.error('Request error, please try again!')
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const headers = {
  'Content-Type': 'application/json'
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
let controller = new AbortController();
let signal = controller.signal;

let timeoutPromise = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ status: 504, statusText: "请求超时 " });
      controller.abort();
    }, timeout);
  }).then(data => ({ data }))
}


//export default (url, method, data) => Promise.race([timeoutPromise(1), request(url, method, data)]).then(data => ({ data }))
export default function request(url, method, data) {
  if (method === "GET") {
    let paramsArray = []
    Object.keys(data).forEach(key => paramsArray.push(key + '=' + data[key]))
    url += '?' + paramsArray.join('&')
    return fetch(url, { method, headers })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => ({ data }))
      .catch(err => ({ err }));
  } else
    return fetch(url, { method, headers, body: JSON.stringify(data) })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => ({ data }))
      .catch(err => ({ err }));
}