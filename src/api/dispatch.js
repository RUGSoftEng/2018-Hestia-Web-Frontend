/**
 * @file Manages dispatching the http requests to the web api.
 */
import axios from 'axios';
import WEB_API_CONFIG from './config';
/**
 * createAuthorizationHeader - Provides the header for authorizing a user.
 *
 * @return {String}  Returns header to be added to the http requests.
 */
function createAuthorizationHeader() {
  const token = localStorage.getItem('access_token');
  const header = 'Bearer '.concat(token);
  return header;
}

/**
 * httpPostUsers - Adds a user.
 *
 * @return {type}  Returns the promise,
 *                 either containing the response of the server or an error.
 */
export function httpPostUsers() {
  const url = `${WEB_API_CONFIG.url}/users/`;
  return axios({
    method: 'POST',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

/**
 * httpGetServers - Get all the servers.
 *
 * @return {type}  Returns the promise,
 *                 either containing the response of the server or an error.
 */
export function httpGetServers() {
  const url = `${WEB_API_CONFIG.url}/servers/`;
  return axios.get(url, { headers: { Authorization: createAuthorizationHeader() } });
}

/**
 * httpPostServers -  Add a server.
 *
 * @param  {type} payload Payload that describes a server to be added.
 * @return {type}         Returns the promise,
 *                        either containing the response of the server or an error.
 */
export function httpPostServers(payload) {
  // eslint-disable-next-line
  console.log('httpPostServers')
  const url = `${WEB_API_CONFIG.url}/servers/`;
  return axios({
    method: 'POST',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
    data: payload,
  });
}

/**
 * httpDeleteServer -  Delete a server.
 *
 * @param  {String} serverid ID of the server.
 * @return {type}          Returns the promise,
 *                         either containing the response of the server or an error.
 */
export function httpDeleteServer(serverid) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}`;
  return axios({
    method: 'DELETE',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

/**
 * httpGetServer -  Get the information of the server.
 *
 * @param  {String} serverid ID of the server.
 * @return {Promise}       Returns the promise,
 *                         either containing the response of the server or an error.
 */
export function httpGetServer(serverid) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}`;
  return axios({
    method: 'GET',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

/**
 * httpPutServer -  Change the inforamtion of the server.
 * @param  {String} serverid Id of the server.
 * @param  {Object} payload  payload containing the information to be changed.
 * @return {Promise}         Returns the promise,
 *                         either containing the response of the server or an error.
 */
export function httpPutServer(serverid, payload) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}`;

  // eslint-disable-next-line
  console.log(url);
  // eslint-disable-next-line
  console.log(JSON.stringify(payload));
  return axios.put(
    url,
    payload,
    { headers: { Authorization: createAuthorizationHeader() } },
  );
}

export function httpGetServerPresets(serverid) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}/presets/`;
  return axios({
    method: 'GET',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

export function httpPostServerPresets(serverid, payload) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}/presets/`;
  return axios({
    method: 'POST',
    url,
    data: payload,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

export function httpDeleteServerPreset(serverid, presetid) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}/presets/${presetid}`;
  return axios({
    method: 'DELETE',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

export function httpPostServerBatchRequest(serverid, payload) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}/batch_request`;
  // eslint-disable-next-line
  console.log(url);
  return axios({
    method: 'POST',
    url,
    data: payload,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

/**
 * httpPostServerRequest -  Send a request to be forwarded to the server.
 *
 * @param  {String} serverid ID of the server.
 * @param  {type} payload  the payload to be forwarded.
 * @return {Promise}       Returns the promise,
 *                         either containing the response of the server or an error.
 */
export function httpPostServerRequest(serverid, payload) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}/request`;
  return axios({
    method: 'POST',
    url,
    data: payload,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}

export function httpPostServerPing(serverid) {
  const url = `${WEB_API_CONFIG.url}/servers/${serverid}/ping`;
  return axios({
    method: 'POST',
    url,
    headers: {
      Authorization: createAuthorizationHeader(),
    },
  });
}
